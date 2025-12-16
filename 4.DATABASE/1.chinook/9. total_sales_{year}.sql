-- 9. total_sales_{year}.sql
-- What are the respective total sales for each of those years?

SELECT strftime('%Y', InvoiceDate) AS InvoiceYear,
       SUM(Total) AS TotalSales
  FROM Invoices
 WHERE strftime('%Y', InvoiceDate) IN ('2009', '2011')
 GROUP BY InvoiceYear;
