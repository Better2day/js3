-- 26. top_3_artists.sql
-- Provide a query that shows the top 3 best selling artists.

SELECT ar.Name AS "Artist Name",
       sum(ii.Quantity) "Total Sales Qty per Artist"
  FROM invoice_items ii
  JOIN tracks t ON ii.TrackId = t.TrackId
  JOIN albums al ON t.AlbumId = al.AlbumId
  JOIN artists ar ON al.ArtistId = ar.ArtistId
 GROUP BY ar.ArtistId
 ORDER BY "Total Sales Qty per Artist" DESC
 LIMIT 3;
