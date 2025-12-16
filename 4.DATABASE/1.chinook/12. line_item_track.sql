-- 12. line_item_track.sql
-- Provide a query that includes the purchased track name with each invoice line item.

SELECT i.InvoiceId,
       i.InvoiceLineId,
       t.Name AS TrackName
  FROM invoice_items i
  JOIN tracks t ON i.TrackId = t.TrackId;
  