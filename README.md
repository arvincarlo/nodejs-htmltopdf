# nodejs-htmltopdf

done items
1. Month and year
2. AccountName
33 to 50

QUERIES:
GET all debit in CASA based on account number
SELECT SUM([debit]) as totalDebit
FROM [FcbsCashTransactionHistorySACA]
WHERE [accountNumber] IN (
  SELECT [accountNumber]
  FROM [WealthAppDB1.0].[dbo].[AccountDataTables]
  WHERE [cif] = 'R23500000'
)
AND EOMONTH([transDateValueDate]) = EOMONTH('2024-04-09');


clarifications:
1. FcbsTimeDeposits.m                                                                                                                                                                    aturityValue type is (Date), how can i total, must be integer value

62	(PHP) Maturity Value TOTAL	Total of all maturity value from client's PHP TD / PSA accounts		Number	Total of  all values under field 	FcbsTimeDeposits.maturityValue
String	PHP	FcbsTimeDeposits.currency