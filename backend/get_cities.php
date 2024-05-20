<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_GET['country_id'])) {
    echo json_encode(["error" => "country_id is required"]);
    exit;
}

$country_id = intval($_GET['country_id']);

try {
    
    $sql = "SELECT * FROM cities WHERE country_id = :country_id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':country_id', $country_id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch(PDOException $e) {

    echo json_encode(["error" => $e->getMessage()]);
}
?>
