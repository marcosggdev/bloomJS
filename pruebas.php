<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="number" value="1" step="1">
    <script>
        document.querySelector("input").addEventListener("change", () => {
            console.log(document.querySelector("input").value);
        });
    </script>
</body>
</html>