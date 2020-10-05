<?php

//On se connecte à la base de données
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=oclock;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

//On crée un objet qui viendra acceuillir les réponses de la base de données et sera envoyé au JS
$times = (Object) [
    'bestTimes' => [],
    'lastTimes' => []
];

$bestTimes = $bdd->query("SELECT `temps`, `date` FROM temps ORDER BY temps ASC LIMIT 10"); //On fait la requete pour récupérer les 10 meilleurs temps

while ($donnes = $bestTimes->fetch()) // Puis on les parcours pour les inscrire dans notre objet de réponse
{
    $times->bestTimes[] = [$donnes['temps'], $donnes['date']];
}

$lastTimes = $bdd->query("SELECT `temps`, `date` FROM temps ORDER BY date DESC LIMIT 10");

while ($donnes = $lastTimes->fetch())
{
    $times->lastTimes[] = [$donnes['temps'], $donnes['date']];
}

print_r(json_encode($times));


?>
