<?php

$timer = $_POST["timer"]; //On récupère le temps via une variable globale POST

//On se connecte à la base de données 
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=oclock;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

//On prépare notre requête d'insrtion avec le temps et une date. La préparation permet d'éviter les injections de code
$req = $bdd->prepare("INSERT INTO temps (`temps`, `date`) VALUE (:temps, :date)");

//Puis on l'execute afin d'enregistrer le temps en base de données
$req->execute(array(
    'temps' => $timer,
    'date' => time()));

?>