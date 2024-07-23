const Url = require('../models/urlModel');
const UserUrl = require('../models/userUrlModel');
const User = require('../models/userModel');
const { getSecretValue } = require('../utils/secretsManager');

async function checkUrl(req, res) {
    const { url } = req.body;

    // 데이터베이스에서 URL 검사
    let urlData = await Url.findOne({ where: { url } });
    if (urlData) {
        return res.json(urlData);
    }

    // 인공지능 서비스 호출 (플라스크 서버)
    const flaskSecret = await getSecretValue('flask-secret-key');
    const response = await fetch(`http://flask-server-url/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${flaskSecret}`
        },
        body: JSON.stringify({ url })
    });

    const result = await response.json();
    urlData = await Url.create({ url, ...result });
    res.json(urlData);
}

async function blockUrl(req, res) {
    const { url, userId } = req.body;

    // 사용자 확인
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    let urlData = await Url.findOne({ where: { url } });
    if (!urlData) {
        urlData = await Url.create({ url });
    }

    await UserUrl.create({ userId: user.id, urlId: urlData.id });
    res.json({ message: 'URL blocked successfully' });
}

async function checkBlockedUrl(req, res) {
    const { url, userId } = req.query;

    const urlData = await Url.findOne({ where: { url } });
    if (!urlData) {
        return res.json({ isBlocked: false });
    }

    const userUrlData = await UserUrl.findOne({ where: { userId, urlId: urlData.id } });
    if (userUrlData) {
        return res.json({ isBlocked: true });
    }

    return res.json({ isBlocked: false });
}

module.exports = { checkUrl, blockUrl, checkBlockedUrl };
