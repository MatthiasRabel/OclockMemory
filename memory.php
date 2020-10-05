<!DOCTYPE html>
<!--
Cet exercice a été réalisé dans un objectif pédagogique.
Toute proposition d'amélioration sera la bienvenue afin d'améliorer la qualité de travail proposé aux apprenants.

-->
<html lang="fr">

<!--
Tout d'abord, on défini l'en-tête de notre page. Dans l'ordre, on définit :
 - Le type d'encodage de la page
 - le titre
 - l'auteur
 - Une description du contenu
 - Des paramètres d'affichage
 - on lie une feuille de style à notre page
 - un icon pour notre page
-->
<head>
	<meta charset="utf-8">
	<title>Memory</title>
	<meta name="author" content="Matthias rabel">
	<meta name="description" content="Jeu du memory">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<link rel="icon" type="image/x-icon" href="images/citronvert.png"/>
</head>

<body>
	<header>Jeu de mémoire</header>
	<main>
		<!--
		Dans ce premier bloc, on définit les tableaux des scores et les boutons pour démarrer ou redémarrer une partie
		-->
		<div id="scoreAndStart">
			<div id="score">
				<table id="bestTimes">
					<caption>Meillieurs Temps</caption>
					<thead>
						<tr>
							<th>
								Temps
							</th>
							<th>
								Date
							</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
				<table id="lastTimes">
					<caption>Derniers Temps</caption>
					<thead>
						<tr>
							<th>
								Temps
							</th>
							<th>
								Date
							</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
			<button id="restartButton">Restart</button>
			<div id="start">
				<button id="startButton">Start</button>
			</div>
		</div>
		<!-- Un bloc conteneur prévu pour acceuillir les cartes de jeux qui seront générées en JS -->
        <div id="container">
			
        </div>
    </main>
	<!--
	Dans le footer, on vient placer les renseignements sur le temps restant pour la partie en cours
	-->
	<footer>
        <div id="progressbarContainer">
			<span id="tempsRestant"></span>
			<progress max="90" value="0" id="progressbar"></progress>
		</div>
    </footer>
	<!--
	Puis on relie à notre page Jquery pour les manipulations sur le DOM et notre script qui viendra gérer notre jeu du mémory
	-->
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="script.js"></script>
</body>

</html>