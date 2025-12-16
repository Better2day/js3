-- 15. playlists_track_count.sql
-- Provide a query that shows the total number of tracks in each playlist. The Playlist name should be include on the resulant table.

SELECT p.Name AS PlaylistName,
       count(pt.TrackId) AS TotalTracks
  FROM playlist_track pt
  JOIN playlists p ON pt.PlaylistId = p.PlaylistId
 GROUP BY p.PlaylistId;
