const express = require("express");
const ytSearch = require("yt-search");
const ytdl = require("@distube/ytdl-core");
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");
const fs = require("fs")
const app = express();
const PORT = 7860;

app.use(cors());

const agent = ytdl.createAgent(require("./cookie.json"));

function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateString) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function uploadTotmpfiles(media, filename) {
    try {
        const form = new FormData();
        form.append("file", media, filename);

        const response = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(response.data.data.url);
        if (!match) {
            throw new Error("Gagal mendapatkan URL hasil upload.");
        }

        return `https://tmpfiles.org/dl/${match[1]}`;
    } catch (error) {
        throw error; 
    }
}

async function getVideoInfo(url) {
    const info = await ytdl.getInfo(url, {
        agent
    });
    const details = info.videoDetails;
    return {
        author: details.author.name,
        description: details.description || "Tidak ada deskripsi",
        duration: `${Math.floor(details.lengthSeconds / 60)}:${details.lengthSeconds % 60} menit`,
        likes: formatNumber(details.likes || 0),
        thumbnail: details.thumbnails.pop().url,
        title: details.title,
        uploadDate: formatDate(details.uploadDate),
        views: formatNumber(details.viewCount),
    };
}

app.get("/video", async (req, res) => {
    const {
        url
    } = req.query;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({
            error: "URL tidak valid"
        });
    }
    try {
        const infoFull = await ytdl.getInfo(url, {
            agent
        });
        let formats = infoFull.formats;
        if (!Array.isArray(formats)) {
            formats = Object.values(formats);
        }
        const videoFormat = ytdl.chooseFormat(formats, {
            filter: "videoandaudio",
            quality: "highest"
        });
        const metadata = await getVideoInfo(url);
        const videoStream = ytdl(url, {
            format: videoFormat,
            agent
        });

        const videoUrl = await uploadTotmpfiles(videoStream, "video.mp4");
        res.json({
            metadata,
            results: {
                quality: videoFormat.qualityLabel || "Tidak diketahui",
                size: videoFormat.contentLength ? formatBytes(parseInt(videoFormat.contentLength)) : "Ukuran tidak tersedia",
                url: videoUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Gagal memproses video",
            details: error.message
        });
    }
});

app.get("/audio", async (req, res) => {
    const {
        url
    } = req.query;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({
            error: "URL tidak valid"
        });
    }
    try {
        const infoFull = await ytdl.getInfo(url, {
            agent
        });
        let formats = infoFull.formats;
        if (!Array.isArray(formats)) {
            formats = Object.values(formats);
        }
        const audioFormat = ytdl.chooseFormat(formats, {
            filter: "audioonly"
        });
        const metadata = await getVideoInfo(url);
        const audioStream = ytdl(url, {
            format: audioFormat,
            agent
        });

        const audioUrl = await uploadTotmpfiles(audioStream, "audio.mp3");
        res.json({
            metadata,
            results: {
                quality: `${audioFormat.audioBitrate} kbps`,
                size: audioFormat.contentLength ? formatBytes(parseInt(audioFormat.contentLength)) : "Ukuran tidak tersedia",
                url: audioUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Gagal memproses audio",
            details: error.message
        });
    }
});

app.get("/search", async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({
            error: "Query parameter 'q' is required"
        });
    }

    try {
        const result = await ytSearch(query);
        const videos = result.videos.map(video => ({
            title: video.title,
            channel: video.author.name,
            views: formatNumber(video.views),
            duration: video.timestamp,
            uploaded: video.ago,
            url: video.url,
            thumbnail: video.thumbnail
        }));

        res.json({
            query,
            results: videos
        });
    } catch (error) {
        console.error("Error fetching YouTube search:", error);
        res.status(500).json({
            error: "Failed to fetch search results",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});