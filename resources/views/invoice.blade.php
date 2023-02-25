<html>
<head>
	<meta charset="utf-8">
	<title>Invoice</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
		}
		.container {
			margin: 50px auto;
			max-width: 800px;
			padding: 20px;
			border: 1px solid #ccc;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}
		.logo {
			max-width: 200px;
		}
		.details {
			font-size: 18px;
		}
		.invoice-table {
			width: 100%;
			border-collapse: collapse;
			margin-bottom: 20px;
		}
		.invoice-table th,
		.invoice-table td {
			padding: 10px;
			border: 1px solid #ccc;
		}
		.invoice-total {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 18px;
			font-weight: bold;
		}
		.invoice-total span {
			margin-right: 10px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<img src="path/to/logo.png" alt="Logo" class="logo">
			<div class="details">
				<p>Invoice Number: 12345</p>
				<p>Date: 2023-02-25</p>
			</div>
		</div>
		<table class="invoice-table">
			<thead>
				<tr>
					<th>Description</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Product 1</td>
					<td>2</td>
					<td>$10.00</td>
					<td>$20.00</td>
				</tr>
				<tr>
					<td>Product 2</td>
					<td>1</td>
					<td>$20.00</td>
					<td>$20.00</td>
				</tr>
			</tbody>
		</table>
		<div class="invoice-total">
			<span>Total:</span>
			<span>$40.00</span>
		</div>
	</div>
</body>
</html>