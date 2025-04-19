export default async function handler(req, res) {
  const { user, zone } = req.query;

  if (!user || !zone) {
    return res.status(400).json({ error: "Missing user or zone parameters" });
  }

  try {
    const response = await fetch(`https://api-mlbb.mtok.top/api/getInfo?user_id=${user}&zone_id=${zone}`);
    const data = await response.json();

    if (data && data.data) {
      const player = data.data;
      return res.status(200).json({
        user_id: player.user_id,
        zone_id: player.zone_id,
        nickname: player.nickname,
        country: player.country,
        win_rate: player.win_rate,
        rank: player.rank,
        mmr: player.mmr,
        emblem: player.emblem,
      });
    } else {
      return res.status(404).json({ error: "Player not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", detail: err.message });
  }
}
