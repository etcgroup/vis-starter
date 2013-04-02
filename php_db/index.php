<?php
include 'include/database.php';

$host = 'localhost';
$user = 'root';
$password = '';
$schema = 'twitter_sagawards';

$db = new Database($host, $user, $password, $schema);

$data = $db->query("SELECT user_id, COUNT(*) as count
                    FROM tweets
                    GROUP BY user_id
                    ORDER BY count DESC
                    LIMIT 100");
?>
<html>
    <head>
        <title>Project</title>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>
    <body>

        <p>Retrieved <?php echo count($data) ?> entries:</p>

        <?php
        foreach ($data as $row)
        {
            var_dump($row);
            echo "<div class='row'>{$row['user_id']}</div>";
        }
        ?>

    </body>
</html>