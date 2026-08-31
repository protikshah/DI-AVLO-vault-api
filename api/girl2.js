const axios = require("axios");

module.exports = async (req, res) => {
    // 📁 girl2 40
    const videos = [
      "https://files.catbox.moe/9589t8.mp4",
      "https://files.catbox.moe/752ct1.mp4",
      "https://files.catbox.moe/bc7vym.mp4",
      "https://files.catbox.moe/km7xr6.mp4",
      "https://files.catbox.moe/gvvbp8.mp4",
      "https://files.catbox.moe/r4kbtr.mp4",
      "https://files.catbox.moe/tpte65.mp4",
      "https://files.catbox.moe/2f4pss.mp4",
      "https://files.catbox.moe/ogljk1.mp4",
      "https://files.catbox.moe/r9fwc4.mp4",
      "https://files.catbox.moe/5ehn6x.mp4",
      "https://files.catbox.moe/491bcw.mp4",
      "https://files.catbox.moe/yo8sf1.mp4",
      "https://files.catbox.moe/v879cr.mp4",
      "https://files.catbox.moe/22s5a8.mp4",
      "https://files.catbox.moe/ypyk8y.mp4",
      "https://files.catbox.moe/vvc80p.mp4",
      "https://files.catbox.moe/atkkcn.mp4",
      "https://files.catbox.moe/lrhhqs.mp4",
      "https://files.catbox.moe/9i7cj5.mp4",
      "https://files.catbox.moe/pm9mao.mp4",
      "https://files.catbox.moe/nx35l3.mp4",
      "https://files.catbox.moe/ye2fil.mp4",
      "https://files.catbox.moe/jd9597.mp4",
      "https://files.catbox.moe/xb1ogm.mp4",
      "https://files.catbox.moe/1azicf.mp4",
      "https://files.catbox.moe/fq6g6h.mp4",
      "https://files.catbox.moe/g4xbvu.mp4",
      "https://files.catbox.moe/exczyw.mp4",
      "https://files.catbox.moe/t0mz5y.mp4",
      "https://files.catbox.moe/f70jo5.mp4",
      "https://files.catbox.moe/xernam.mp4",
      "https://files.catbox.moe/hfpack.mp4",
      "https://files.catbox.moe/0vl31x.mp4",
      "https://files.catbox.moe/8e8u5x.mp4",
      "https://files.catbox.moe/ci6ucl.mp4",
      "https://files.catbox.moe/r6y42w.mp4",
      "https://files.catbox.moe/mchey6.mp4",
      "https://files.catbox.moe/q16v0h.mp4",
      "https://files.catbox.moe/ulz01p.mp4"
    ];

    try {
        const randomUrl = videos[Math.floor(Math.random() * videos.length)];
        const response = await axios({
            method: "GET",
            url: randomUrl,
            responseType: "stream"
        });

        res.setHeader("Content-Type", "video/mp4");
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: "Video stream failed." });
    }
};
