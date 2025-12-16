-- 25. top_5_tracks.sql
-- Provide a query that shows the top 5 most purchased songs.

SELECT t.Name AS "Track Name",
       sum(ii.Quantity) "Sales Qty per Track"
  FROM invoices i
  JOIN invoice_items ii ON i.InvoiceId = ii.InvoiceId
  JOIN tracks t ON ii.TrackId = t.TrackId
 GROUP BY t.TrackId
 ORDER BY "Sales Qty per Track" DESC
 LIMIT 5;
