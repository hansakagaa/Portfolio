<?php
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$redirect_url = $protocol . $_SERVER['HTTP_HOST'] . '/public/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="1;url=<?php echo $redirect_url; ?>">
    <title>Loading...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #e6e7ee;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .loader-container {
            text-align: center;
        }
        .spinner {
            width: 60px;
            height: 60px;
            border: 6px solid #e6e7ee;
            border-top: 6px solid #31344b;
            border-bottom: 6px solid #31344b;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
            margin: 0 auto 20px;
        }
        h2 {
            color: #31344b;
            font-size: 1.2rem;
            font-weight: 500;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>

<div class="loader-container">
    <div class="spinner"></div>
    <h2>Preparing your experience, please wait...</h2>
</div>

<script>
    setTimeout(function() {
        window.location.href = "<?php echo $redirect_url; ?>";
    }, 1000);
</script>

</body>
</html>
