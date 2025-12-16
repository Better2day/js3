-- 17. invoices_line_item_count.sql
-- Provide a query that shows all Invoices but includes the # of invoice line items.

SELECT i.*, count(ii.InvoiceLineId) AS LineItemsCount
  FROM invoices i
  JOIN invoice_items ii ON i.InvoiceId = ii.InvoiceId
 GROUP BY i.InvoiceId;
