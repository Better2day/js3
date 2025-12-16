-- 16. tracks_no_id.sql
-- Provide a query that shows all the Tracks, but displays no IDs. The result should include the Album name, Media type and Genre.

SELECT a.Title AS AlbumName,
       t.Name AS TrackName,
       g.Name AS Genre,
       m.Name AS MediaType
  FROM tracks t
  JOIN albums a ON t.AlbumId = a.AlbumId
  JOIN genres g ON t.GenreId = g.GenreId
  JOIN media_types m ON t.MediaTypeId = m.MediaTypeId;
