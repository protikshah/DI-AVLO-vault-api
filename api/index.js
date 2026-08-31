const express = require("express");
const axios = require("axios");
const app = express();

// 🔒 1. PERMISSION & KILL SWITCH LIST
const ALLOWED_KEYS = [
    "DI-ABLO-PROTIK-OWNER", // তোর সিক্রেট চাবি
    "KEY-USER-RAHIM"        // ফ্রেন্ড বা ইউজারের চাবি
];

// 📁 2. MEDIA VAULT CATEGORIES
const mediaVault = {
    redgirl: [
      "https://files.catbox.moe/8mm6kh.mp4", "https://files.catbox.moe/ssikpx.mp4", "https://files.catbox.moe/joz0lj.mp4",
      "https://files.catbox.moe/gds0hh.mp4", "https://files.catbox.moe/b2a2ve.mp4", "https://files.catbox.moe/mv9mwn.mp4",
      "https://files.catbox.moe/ropskb.mp4", "https://files.catbox.moe/tgfaq9.mp4", "https://files.catbox.moe/4ss681.mp4",
      "https://files.catbox.moe/3711f6.mp4", "https://files.catbox.moe/396xbs.mp4", "https://files.catbox.moe/tioyic.mp4",
      "https://files.catbox.moe/de8grq.mp4", "https://files.catbox.moe/rwvx62.mp4", "https://files.catbox.moe/oijjyt.mp4",
      "https://files.catbox.moe/fmb56q.mp4", "https://files.catbox.moe/j125v4.mp4", "https://files.catbox.moe/pj1r2a.mp4",
      "https://files.catbox.moe/e4lurj.mp4", "https://files.catbox.moe/u38xwi.mp4", "https://files.catbox.moe/9whci4.mp4",
      "https://files.catbox.moe/e1ou76.mp4", "https://files.catbox.moe/d1vksa.mp4", "https://files.catbox.moe/mgqwml.mp4",
      "https://files.catbox.moe/5sau1u.mp4", "https://files.catbox.moe/nobuhr.mp4", "https://files.catbox.moe/7tx3ur.mp4",
      "https://files.catbox.moe/xwu69p.mp4", "https://files.catbox.moe/lqmn3w.mp4", "https://files.catbox.moe/n92ev9.mp4",
      "https://files.catbox.moe/wh848g.mp4", "https://files.catbox.moe/fgfmhg.mp4", "https://files.catbox.moe/m7jvzy.mp4",
      "https://files.catbox.moe/o14k29.mp4", "https://files.catbox.moe/vk4a17.mp4", "https://files.catbox.moe/2xpazi.mp4",
      "https://files.catbox.moe/g7a1y9.mp4", "https://files.catbox.moe/srmay9.mp4", "https://files.catbox.moe/dhc13f.mp4",
      "https://files.catbox.moe/1al5i0.mp4", "https://files.catbox.moe/2bxzx0.mp4", "https://files.catbox.moe/nw5k61.mp4",
      "https://files.catbox.moe/f3pogm.mp4", "https://files.catbox.moe/o5234v.mp4", "https://files.catbox.moe/bex9ml.mp4",
      "https://files.catbox.moe/crt7ai.mp4", "https://files.catbox.moe/oymzv7.mp4"
    ],
    romantic: [
      "https://files.catbox.moe/nbzg9q.mp4", "https://files.catbox.moe/f5b77c.mp4", "https://files.catbox.moe/x5efgi.mp4",
      "https://files.catbox.moe/c207ri.mp4", "https://files.catbox.moe/sdh5lz.mp4", "https://files.catbox.moe/hd6rqw.mp4",
      "https://files.catbox.moe/p43of7.mp4", "https://files.catbox.moe/tpzhd8.mp4", "https://files.catbox.moe/hkkyof.mp4",
      "https://files.catbox.moe/6a9pao.mp4", "https://files.catbox.moe/afvp8x.mp4", "https://files.catbox.moe/qv0ngh.mp4",
      "https://files.catbox.moe/raszev.mp4", "https://files.catbox.moe/5uysqj.mp4", "https://files.catbox.moe/e0smb2.mp4",
      "https://files.catbox.moe/j8k6tb.mp4", "https://files.catbox.moe/b22jc9.mp4", "https://files.catbox.moe/hh8oov.mp4",
      "https://files.catbox.moe/32i59h.mp4", "https://files.catbox.moe/nniupw.mp4", "https://files.catbox.moe/m40ecg.mp4",
      "https://files.catbox.moe/r21xki.mp4", "https://files.catbox.moe/yluc1y.mp4", "https://files.catbox.moe/s2jn9t.mp4",
      "https://files.catbox.moe/472w4e.mp4", "https://files.catbox.moe/ono1j4.mp4", "https://files.catbox.moe/mtrbdu.mp4",
      "https://files.catbox.moe/qfyipz.mp4", "https://files.catbox.moe/fnf91d.mp4", "https://files.catbox.moe/bl5sxg.mp4",
      "https://files.catbox.moe/2o0cw8.mp4", "https://files.catbox.moe/yuaqvz.mp4", "https://files.catbox.moe/hthphc.mp4",
      "https://files.catbox.moe/i9oasi.mp4", "https://files.catbox.moe/wmdos7.mp4", "https://files.catbox.moe/ml5lof.mp4",
      "https://files.catbox.moe/xhkpyn.mp4", "https://files.catbox.moe/5887oq.mp4", "https://files.catbox.moe/k1azqr.mp4",
      "https://files.catbox.moe/lp627q.mp4", "https://files.catbox.moe/d4h6jp.mp4", "https://files.catbox.moe/n9ta4p.mp4",
      "https://files.catbox.moe/9dgdc8.mp4"
    ],
    singgirl: [
      "https://files.catbox.moe/64j2e9.mp4", "https://files.catbox.moe/rmmylk.mp4", "https://files.catbox.moe/hzjhf3.mp4",
      "https://files.catbox.moe/940m54.mp4", "https://files.catbox.moe/vqwv4v.mp4", "https://files.catbox.moe/ar4jwu.mp4",
      "https://files.catbox.moe/1klhhk.mp4", "https://files.catbox.moe/7cp9ni.mp4", "https://files.catbox.moe/bpoajx.mp4",
      "https://files.catbox.moe/gzu6cv.mp4", "https://files.catbox.moe/pj1r2a.mp4", "https://files.catbox.moe/vzhgip.mp4",
      "https://files.catbox.moe/zvc83c.mp4", "https://files.catbox.moe/8m3s8o.mp4", "https://files.catbox.moe/t3kqch.mp4",
      "https://files.catbox.moe/0181ap.mp4", "https://files.catbox.moe/08h7s2.mp4", "https://files.catbox.moe/44wboe.mp4",
      "https://files.catbox.moe/48uaca.mp4"
    ],
    girl99: [
      "https://files.catbox.moe/xktox6.mp4", "https://files.catbox.moe/rw1vxd.mp4", "https://files.catbox.moe/8r5z4r.mp4",
      "https://files.catbox.moe/2otopk.mp4", "https://files.catbox.moe/sg6ag6.mp4", "https://files.catbox.moe/2n69yc.mp4",
      "https://files.catbox.moe/tqx4i3.mp4", "https://files.catbox.moe/u6ppwr.mp4", "https://files.catbox.moe/6picwc.mp4",
      "https://files.catbox.moe/fjp6eh.mp4", "https://files.catbox.moe/tt12v3.mp4", "https://files.catbox.moe/qjb65x.mp4",
      "https://files.catbox.moe/lgg303.mp4", "https://files.catbox.moe/2l5de7.mp4", "https://files.catbox.moe/1itbo4.mp4",
      "https://files.catbox.moe/b2e4co.mp4", "https://files.catbox.moe/784po9.mp4", "https://files.catbox.moe/uthj7a.mp4",
      "https://files.catbox.moe/qf3epm.mp4", "https://files.catbox.moe/bzex44.mp4", "https://files.catbox.moe/z0pq75.mp4",
      "https://files.catbox.moe/kg8lht.mp4", "https://files.catbox.moe/fbgztj.mp4", "https://files.catbox.moe/81s5ll.mp4",
      "https://files.catbox.moe/pcefyb.mp4", "https://files.catbox.moe/g87uij.mp4", "https://files.catbox.moe/t0m4fd.mp4",
      "https://files.catbox.moe/psnyvf.mp4", "https://files.catbox.moe/y9581k.mp4", "https://files.catbox.moe/50v589.mp4",
      "https://files.catbox.moe/r1f7r2.mp4", "https://files.catbox.moe/vbkw1k.mp4", "https://files.catbox.moe/tc0jzj.mp4",
      "https://files.catbox.moe/yajxkr.mp4", "https://files.catbox.moe/856809.mp4", "https://files.catbox.moe/biihbv.mp4",
      "https://files.catbox.moe/qv4pal.mp4"
    ],
    anygirl: [
      "https://files.catbox.moe/xktox6.mp4", "https://files.catbox.moe/rw1vxd.mp4", "https://files.catbox.moe/8r5z4r.mp4",
      "https://files.catbox.moe/2otopk.mp4", "https://files.catbox.moe/sg6ag6.mp4", "https://files.catbox.moe/2n69yc.mp4",
      "https://files.catbox.moe/tqx4i3.mp4", "https://files.catbox.moe/u6ppwr.mp4", "https://files.catbox.moe/6picwc.mp4",
      "https://files.catbox.moe/fjp6eh.mp4", "https://files.catbox.moe/tt12v3.mp4", "https://files.catbox.moe/qjb65x.mp4",
      "https://files.catbox.moe/lgg303.mp4", "https://files.catbox.moe/2l5de7.mp4", "https://files.catbox.moe/1itbo4.mp4",
      "https://files.catbox.moe/b2e4co.mp4", "https://files.catbox.moe/784po9.mp4", "https://files.catbox.moe/uthj7a.mp4",
      "https://files.catbox.moe/qf3epm.mp4", "https://files.catbox.moe/bzex44.mp4", "https://files.catbox.moe/z0pq75.mp4",
      "https://files.catbox.moe/kg8lht.mp4", "https://files.catbox.moe/fbgztj.mp4", "https://files.catbox.moe/81s5ll.mp4",
      "https://files.catbox.moe/pcefyb.mp4", "https://files.catbox.moe/g87uij.mp4", "https://files.catbox.moe/t0m4fd.mp4",
      "https://files.catbox.moe/psnyvf.mp4", "https://files.catbox.moe/y9581k.mp4", "https://files.catbox.moe/50v589.mp4",
      "https://files.catbox.moe/r1f7r2.mp4", "https://files.catbox.moe/vbkw1k.mp4", "https://files.catbox.moe/tc0jzj.mp4",
      "https://files.catbox.moe/yajxkr.mp4", "https://files.catbox.moe/856809.mp4", "https://files.catbox.moe/biihbv.mp4",
      "https://files.catbox.moe/qv4pal.mp4"
    ],
    girl2: [
      "https://files.catbox.moe/9589t8.mp4", "https://files.catbox.moe/752ct1.mp4", "https://files.catbox.moe/bc7vym.mp4",
      "https://files.catbox.moe/km7xr6.mp4", "https://files.catbox.moe/gvvbp8.mp4", "https://files.catbox.moe/r4kbtr.mp4",
      "https://files.catbox.moe/tpte65.mp4", "https://files.catbox.moe/2f4pss.mp4", "https://files.catbox.moe/ogljk1.mp4",
      "https://files.catbox.moe/r9fwc4.mp4", "https://files.catbox.moe/5ehn6x.mp4", "https://files.catbox.moe/491bcw.mp4",
      "https://files.catbox.moe/yo8sf1.mp4", "https://files.catbox.moe/v879cr.mp4", "https://files.catbox.moe/22s5a8.mp4",
      "https://files.catbox.moe/ypyk8y.mp4", "https://files.catbox.moe/vvc80p.mp4", "https://files.catbox.moe/atkkcn.mp4",
      "https://files.catbox.moe/lrhhqs.mp4", "https://files.catbox.moe/9i7cj5.mp4", "https://files.catbox.moe/pm9mao.mp4",
      "https://files.catbox.moe/nx35l3.mp4", "https://files.catbox.moe/ye2fil.mp4", "https://files.catbox.moe/jd9597.mp4",
      "https://files.catbox.moe/xb1ogm.mp4", "https://files.catbox.moe/1azicf.mp4", "https://files.catbox.moe/fq6g6h.mp4",
      "https://files.catbox.moe/g4xbvu.mp4", "https://files.catbox.moe/exczyw.mp4", "https://files.catbox.moe/t0mz5y.mp4",
      "https://files.catbox.moe/f70jo5.mp4", "https://files.catbox.moe/xernam.mp4", "https://files.catbox.moe/hfpack.mp4",
      "https://files.catbox.moe/0vl31x.mp4", "https://files.catbox.moe/8e8u5x.mp4", "https://files.catbox.moe/ci6ucl.mp4",
      "https://files.catbox.moe/r6y42w.mp4", "https://files.catbox.moe/mchey6.mp4", "https://files.catbox.moe/q16v0h.mp4",
      "https://files.catbox.moe/ulz01p.mp4"
    ]
};

// 🛡️ API ENGINE
app.get("/api/media", async (req, res) => {
    const clientKey = req.headers["x-api-key"];
    const authorHeader = req.headers["x-author-name"];
    const category = req.query.category;

    const isValidAuthor = authorHeader && (authorHeader.includes("Pratik Shah") || authorHeader.includes("DI-ABLO JI-SOO"));

    if (!clientKey || !ALLOWED_KEYS.includes(clientKey) || !isValidAuthor) {
        return res.status(403).json({
            status: "blocked",
            message: "⛔ ACCESS DENIED! License invalid or Author modified."
        });
    }

    if (!category || !mediaVault[category]) {
        return res.status(400).json({
            status: "error",
            message: `❌ Invalid category! Available: ${Object.keys(mediaVault).join(", ")}`
        });
    }

    try {
        const categoryList = mediaVault[category];
        const randomMediaUrl = categoryList[Math.floor(Math.random() * categoryList.length)];

        const stream = await axios({ method: "GET", url: randomMediaUrl, responseType: "stream" });
        
        if (randomMediaUrl.endsWith(".mp4")) {
            res.setHeader("Content-Type", "video/mp4");
        } else {
            res.setHeader("Content-Type", "image/jpeg");
        }

        stream.data.pipe(res);
    } catch (err) {
        res.status(500).json({ status: "error", message: "Failed to stream media asset." });
    }
});

module.exports = app;
