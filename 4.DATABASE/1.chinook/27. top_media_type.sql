-- 27. top_media_type.sql
-- Provide a query that shows the most purchased Media Type.

SELECT m.Name AS "Media Type",
       sum(ii.Quantity) "Total Sales Qty per Media Type"
  FROM invoice_items ii
  JOIN tracks t ON ii.TrackId = t.TrackId
  JOIN media_types m ON t.MediaTypeId = m.MediaTypeId
 GROUP BY m.MediaTypeId
 ORDER BY "Total Sales Qty per Media Type" DESC
 LIMIT 1;
