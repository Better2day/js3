-- 13. line_item_track_artist.sql
-- Provide a query that includes the purchased track name AND artist name with each invoice line item.

SELECT i.InvoiceId, i.InvoiceLineId,
       t.Name AS TrackName,
       ar.Name AS ArtistName
  FROM invoice_items i
  JOIN tracks t ON i.TrackId = t.TrackId
  JOIN albums a ON t.AlbumId = a.AlbumId
  JOIN artists ar ON a.ArtistId = ar.ArtistId;
