<!DOCTYPE html>
<html>

<!-- Mirrored from csgo.gl/history.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 25 Jun 2015 05:50:37 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>[Сайт-рулетка] Тест</title>
	<meta name="keywords" content="Рулетка csgo gl, сайт-рулетка cs go, рулетка cs go gl, лотерея csgo, лотерея cs go, лотерея csgo gl, сайт-лотерея cs go, скины csgo бесплатно, конкурс на скины csgo, купить скины csgo">
	<meta name="description" content="Сайт-лотерея CSGO.GL . Поднимись с ширпотреба до ножа! В чем принцип? Когда набирается необходимое количество предметов или проходит отведенное на игру время, система случайным образом выбирает победителя, который забирает все предметы. Чаще выигрывает тот, кто добавил более дорогие скины, но есть шанс у каждого!"> 
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="../maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/jquery.arcticmodal-0.3.css">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/uploads/favicon/apple-touch-icon-144-precomposed.html">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/uploads/favicon/apple-touch-icon-114-precomposed.html">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/uploads/favicon/apple-touch-icon-72-precomposed.html">
	<script src="js/libs/jquery-2.1.3.min.js"></script>
	<script src="js/libs/jquery-ui.min.js"></script>
	<script src="js/jquery.noty.packaged.min.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<script src="js/libs/jquery.arcticmodal-0.3.min.js"></script>

	
	<script src="script.js"></script>

<style>
	.light-arial {
		font-family: 'Open Sans Light' arial;
	}
	</style>
</head><body id="history-page">
	<audio id="new-item-sound" src="audio/message.mp3" preload="auto"></audio>
<audio id="start-game-sound" src="audio/msg2.mp3" preload="auto"></audio>

<nav class="navbar navbar-default navbar-static-top">
	<div class="container">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		<span class="sr-only">MENU</span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="index.html" style="margin: 0px;"><img alt="CSGO.GL" src="img/logo-2..png" height="90" width="auto" style="margin-top: -21px;"></a>
	</div>

	<!-- Collect the nav links, forms, and other content for toggling -->
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="font-family: &#39;PT Sans&#39;, arial;">
		<ul class="nav navbar-nav navbar-right">
			<li><a href="index.php">Играть</a></li>
			<li><a href="history.php">История</a></li>
			<li><a href="top.php">Топ</a></li>
			<li><a href="about.php">Правила</a></li>
						<li><a href="https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&amp;openid.mode=checkid_setup&amp;openid.return_to=http%3A%2F%2Fcsgo.gl%2Flogger.php%3Flogin&amp;openid.realm=http%3A%2F%2Fcsgo.gl&amp;openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&amp;openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select">Войти</a></li>
					</ul>
	</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>

	<div class="wrap">
		<div class="container">
			<div class="row">
				    <div class="col-md-3 block-left">
		    	<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title" style="font-family: &#39;PT Sans&#39;, arial;">Меню</h3>
				  </div>
				  					  <div class="panel-body">
					    <div class="list-group" style="font-family: &#39;PT Sans&#39;, arial;">
							<a href="index.html" class="list-group-item"><i class="fa fa-play"></i> Играть</a>
						   
						  <!-- <a href="http://vk.com/gl.csgo" target="_blank" class="list-group-item"><i class="fa fa-vk"></i> МЫ ВКОНТАКТЕ</a> -->
							<a href="https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&amp;openid.mode=checkid_setup&amp;openid.return_to=http%3A%2F%2Fcsgo.gl%2Flogger.php%3Flogin&amp;openid.realm=http%3A%2F%2Fcsgo.gl&amp;openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&amp;openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select" class="list-group-item"><i class="fa fa-sign-in"></i> Войти</a>
      					</div>
					  </div>
				  				</div>
				<div class="cont-info">
					<a href="http://vk.com/gl.csgo" target="_blank">
					<i class="fa fa-vk fa-5x" style="color: #c2c2c2;"></i>
					<h4 style="color: white;font-family: &#39;Open Sans Light&#39; arial;">Подписывайся на группу</h4>
</a>
				</div>
				<!--<div class="cont-info" style="margin-top: 20px;">
					<h4 style="color: white; font-family: 'Open Sans Light' arial"><i class="fa fa-users" style="margin-right: 15px;"></i>Сейчас на сайте: <span class="on_now">0</span></h4>
				</div>-->
				
				<div class="cont-info" style="margin-top: 20px;">
					<a href="http://steamcommunity.com/id/user/edit" target="_blank"><i class="fa fa-gift fa-5x" style="color: #04c138;"></i></a>
					<h4><a href="http://steamcommunity.com/id/user/edit" target="_blank" style="color: #04c138">ДОБАВЬ</a> К НИКУ<br> 
					"CSGO.GL" И ПОЛУЧИ<br>
					+5% К ШАНСУ</h4>
				</div>
				<div class="cont-info last_win" style="margin-top: 20px;min-height: 200px;"><h4>ПОСЛЕДНИЙ ПОБЕДИТЕЛЬ</h4><div id="winner-avatar"></div><h4 id="winner-name">Ник</h4><div class="light-arial"><h5>Выигрыш: <span id="winner-money">0 </span></h5><h5>Шанс: <span id="winner-chance">100</span> %</h5></div></div>
				<div class="cont-info-dop" style="margin-top: 20px; padding-left: 7px; padding-right: 7px; margin-bottom:50px;">
     <h4 style="color: white; font-family: &#39;Open Sans Light&#39; arial; font-size: 10pt;">Сейчас на сайте человек: <span id="inf1" style="color: #04c138;">0</span></h4>
    </div>
    
    
				
		    </div>				<div class="col-md-9">
			   		<div class="game-block">
					    <div class="row">
							<div class="here">
								<a href="http://vk.com/gl.csgo?w=wall-93050671_4147" target="_blank">
									<img src="mega.png" style="margin-top: -15px;" class="img-responsive" alt="Прими участие в розыгрыше в группе VK!">
								</a>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
<!-- Mirrored from csgo.gl/history.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 25 Jun 2015 05:50:39 GMT -->
</html>