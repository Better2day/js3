-- 24. top_2013_track.sql
-- Provide a query that shows the most purchased track of 2013.
-- most purchased? 가장 수량이 많이 팔린 것인 듯

-- SELECT t.Name AS "Track Name",
--        i.InvoiceId,
--        ii.InvoiceLineId,
--        ii.UnitPrice,
--        ii.Quantity
--   FROM invoices i
--   JOIN invoice_items ii ON i.InvoiceId = ii.InvoiceId
--   JOIN tracks t ON ii.TrackId = t.TrackId
--  ORDER BY t.Name, i.InvoiceId, ii.InvoiceLineId;

SELECT t.Name AS "Track Name",
       sum(ii.Quantity) "Sales Qty per Track"
  FROM invoices i
  JOIN invoice_items ii ON i.InvoiceId = ii.InvoiceId
  JOIN tracks t ON ii.TrackId = t.TrackId
 WHERE strftime('%Y', i.InvoiceDate) = '2013'
 GROUP BY t.TrackId
 ORDER BY "Sales Qty per Track" DESC
  LIMIT 1; -- 2013년에 1개 이상 판매된 트랙이 없어서 의미가 없다.
-- 2013년은 커녕 전체 기간을 봐도 전부 1~2개 사이 판매
