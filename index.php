<?php
include 'include/database.php';

$host = 'localhost';
$user = 'root';
$password = '';
$schema = 'twitter';

$db = new Database($host, $user, $password, $schema);

$data = $db->count_tweets_by_user();
?>
<html>
    <head>
        <title>Project</title>
    </head>
    <body>

        <p>Retrieved <?php echo count($data) ?> entries:</p>

        <?php
        foreach ($data as $row)
        {
            var_dump($row);
        }
        ?>

    </body>
</html>