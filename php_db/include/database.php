<?php

class Database {

    private $db;

    public function __construct($host, $user, $password, $schema)
    {
        //An object for querying the database.
        //More: http://php.net/manual/en/class.mysqli.php
        $this->db = new mysqli($host, $user, $password, $schema);

        if ($this->db->connect_errno) {
            printf("Connect failed: %s\n", $this->db->connect_error);
        }

        //Just making sure the database outputs times in UTC
        $this->db->query("set time_zone = '+00:00'");
    }

    /**
     * Run a database query and return the result as
     * a list of associative arrays.
     */
    public function query($querystring) {

        //Run any sql query like this
        //More: http://php.net/manual/en/mysqli.query.php
        $result = $this->db->query($querystring);

        //$result is a mysqli_result object
        //More: http://php.net/manual/en/class.mysqli-result.php
        //Go through each row in $result creating an associative array

        if (!$result) {
            printf("Error: %s\n", $this->db->error);
        }

        $data = array();
        //Results can also be obtained as numerically indexed
        //arrays, or field by field.
        while ($row = $result->fetch_assoc())
        {
            //Add the rows to $data
            $data[] = $row;
        }

        return $data;
    }
}
