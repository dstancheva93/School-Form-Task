<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if (!isset($_GET['city_id'])) {
    echo json_encode(["error" => "city_id is required"]);
    exit;
}


$city_id = intval($_GET['city_id']);

try {
    
    $sql = "SELECT * FROM schools WHERE city_id = :city_id";
    $stmt = $conn->prepare($sql);
    
    
    $stmt->bindParam(':city_id', $city_id, PDO::PARAM_INT);
    $stmt->execute();
    
    
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch(PDOException $e) {
    
    echo json_encode(["error" => $e->getMessage()]);
}
?>
