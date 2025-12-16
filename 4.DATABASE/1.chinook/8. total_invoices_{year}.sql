-- 8. total_invoices_{year}.sql
-- How many Invoices were there in 2009 and 2011?

SELECT strftime('%Y', InvoiceDate) AS InvoiceYear,
       COUNT(InvoiceId) AS InvoiceCount
  FROM Invoices
 WHERE strftime('%Y', InvoiceDate) IN ('2009', '2011')
 GROUP BY InvoiceYear;

-- strftime이 날짜를 '문자열'로 변환시키기 때문에, 따옴표 없이 그냥 2009 2011 조건과 비교하면 안 됨
-- 숫자로 비교할거면 CAST(strftime('%Y', InvoiceDate) AS INT) BETWEEN 2009 AND 2011
-- 식으로 연도를 숫자로 변환한 다음에 비교해야 한다.
