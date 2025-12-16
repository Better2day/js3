-- 10. invoice_37_line_item_count.sql
-- Looking at the InvoiceLine table, provide a query that COUNTs the number of line items for Invoice ID 37.

-- SELECT i.InvoiceId,
--        count(InvoiceLineId) AS ItemCount
--   FROM invoices i
--   JOIN invoice_items ii ON i.InvoiceId = ii.InvoiceId
--  WHERE i.InvoiceId = 37;

-- 인보이스 정보 필요 없으면 조인 없이 아래처럼 간단하게

SELECT COUNT(InvoiceLineId) AS LineItemCount
  FROM invoice_items
 WHERE InvoiceId = 37;
 