<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":
        $sql = "SELECT * FROM penggunas";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $penggunas = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $penggunas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($penggunas);
        break;

    case "POST";
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO penggunas(id, name, email, mobile, created_at) VALUES (null, :name, :email, :mobile, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record Created Succesfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed To Create Record'];
        }
        echo json_encode($response);
        break;

    case "PUT";
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE penggunas SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record Update Succesfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed To Update'];
        }
        echo json_encode($response);
        break;

    case "DELETE";
        $sql = "DELETE FROM penggunas WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);


        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record delete Succesfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed To delete'];
        }
        echo json_encode($response);
        break;
}
