import React, { Component } from 'react';
import querystring from 'query-string'
import InnerHTML from 'dangerously-set-html-content';
import { dataEncrypt, dataDecrypt, genPassword, apiURL } from "util/Util.jsx";

const newContent = `<div>This wil be rendered</div>
<div><img src="https://d33wubrfki0l68.cloudfront.net/727b797f23a63181d758e7bb2d404bc351d4ad0c/94569/img/og.png" alt="">
</div>
<script>
  alert('testing')
</script>`;

const rawHTML = `
<!DOCTYPE html>
<html lang="en"><!-- Basic -->
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">   
   
    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 
     <!-- Site Metas -->
    <title>The Real Wedding - Responsive OnePage HTML5 Template</title>  
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/images/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/images/apple-touch-icon.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/css/bootstrap.min.css">
    <!-- Pogo Slider CSS -->
    <link rel="stylesheet" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/css/pogo-slider.min.css">
	<!-- Site CSS -->
    <link rel="stylesheet" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/css/style.css">    
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="https://grapesjs.fra1.digitaloceanspaces.com/Template/css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">

	<!-- LOADER -->
    <div id="preloader" style="display:none;">
		<div class="preloader pulse">
			<i class="fa fa-heartbeat" aria-hidden="true"></i>
		</div>
    </div><!-- end loader -->
    <!-- END LOADER -->
	
	<!-- Start header -->
	<header class="top-header">
		<nav class="navbar header-nav navbar-expand-lg">
            <div class="container-fluid">
				<a class="navbar-brand" href="index.html"><img src="https://grapesjs.fra1.digitaloceanspaces.com/Template/images/logo.jpg" alt="image"></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
					<span></span>
					<span></span>
					<span></span>
				</button>
                <div class="collapse navbar-collapse justify-content-end" id="navbar-wd"> 
                     <ul class="navbar-nav"> 
                        <li><a class="nav-link active" href="#home">Home</a></li> 
						<li><a class="nav-link" href="#about">Venue</a></li> 
                        <li><a class="nav-link" href="#story">Story</a></li> 
                        <li><a class="nav-link" href="#gallery">Reception</a></li>
						<li><a class="nav-link" href="#contact">Invited by</a></li>
                     </ul>
                </div> 
            </div>
        </nav>
	</header>
	<!-- End header -->
	
	<!-- Start Banner -->
	<div class="ulockd-home-slider">
		<div class="container-fluid">
			<div class="row">
				<div class="pogoSlider" id="js-main-slider">
					<div class="pogoSlider-slide" data-transition="zipReveal" data-duration="1500" style="background-image:url(https://grapesjs.fra1.digitaloceanspaces.com/Template/images/slider-01.jpg);">
						<div class="lbox-caption">
							<div class="lbox-details">
								<h1>#Leida & #Dominic</h1>
								<h2>We're getting married</h3>
								<p>Save The Date &nbsp;&nbsp; <strong>20 June 2018</strong></p>								
							</div>
						</div>
					</div>
					<div class="pogoSlider-slide" data-transition="blocksReveal" data-duration="1500" style="background-image:url(https://grapesjs.fra1.digitaloceanspaces.com/Template/images/slider-02.jpg);">
						<div class="lbox-caption">
							<div class="lbox-details">
								<h1>#Leida & #Dominic</h1>
								<h2>We're getting married</h3>
								<p>Save The Date &nbsp;&nbsp;<strong>20 June 2018</strong></p>
							</div>
						</div>
					</div>
					<div class="pogoSlider-slide" data-transition="shrinkReveal" data-duration="2000" style="background-image:url(https://grapesjs.fra1.digitaloceanspaces.com/Template/images/slider-03.jpg);">
						<div class="lbox-caption">
							<div class="lbox-details">
								<h1>#Leida & #Dominic</h1>
								<h2>We're getting married</h3>
								<p>Save The Date &nbsp;&nbsp;<strong>20 June 2018</strong></p>
							</div>
						</div>
						
					</div>
				</div><!-- .pogoSlider -->
			</div>
		</div>
	</div>
	<!-- End Banner -->
	
	<!-- Start About us -->
	<div id="about" class="about-box">
		<div class="about-a1">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="title-box">
							<h2><span style="text-decoration:none;">Venue</span></h2>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="row align-items-center about-main-info">
							<div class="col-sm-12">
								<h2 style="text-align:center;"> SPG Grand Banquet Hall</h2>
								<p style="text-align:center;">2nd Floor, Above Bajaj Electronics, Champapet Road, Karmanghat, Thapovan Colony, Sai Nagar, East Saroor Nagar, beside Krishna Sai Hospital, Hyderabad, Telangana 500079 </p>
							</div>							
						</div>						
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End About us -->
	
	<!-- Start Story -->
	<div id="story" class="story-box main-timeline-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="title-box">
						<h2>Our Story</h2>
						<video width="800" controls>
						  <source src="mov_bbb.mp4" type="video/mp4">
						  <source src="mov_bbb.ogg" type="video/ogg">
						  Your browser does not support HTML video.
						</video>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Story -->
	
	<!-- Start Gallery -->
	<div id="gallery" class="gallery-box">
		<div class="container-fluid">
			<!-- <div class="row"> -->
				<!-- <div class="col-lg-12"> -->
					<!-- <div class="title-box"> -->
						<!-- <h2>Gallery</h2> -->
						<!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> -->
					<!-- </div> -->
				<!-- </div> -->
			<!-- </div> -->
			<div class="row">
			<img class="img-fluid" src="https://grapesjs.fra1.digitaloceanspaces.com/Template/images/reception-bg.jpg" alt="single image" width="100%">	
<div  style="margin-top: -300px;margin-left: 550px;font-family: 'Marck Script', cursive;"><h1 style="color:#f0f0f0; font-size: 80px;">Reception</h1>	</div>			
				<!-- <ul class="popup-gallery clearfix"> -->
					<!-- <li> -->
						<!-- <a href="images/reception-bg.jpg"> -->
							<!-- <img class="img-fluid" src="images/reception-bg.jpg" alt="single image"> -->
							<!-- <!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> --> 
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-02.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-02.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-03.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-03.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-04.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-04.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-05.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-05.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-06.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-06.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-07.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-07.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
					<!-- <li> -->
						<!-- <a href="images/gallery-08.jpg"> -->
							<!-- <img class="img-fluid" src="images/gallery-08.jpg" alt="single image"> -->
							<!-- <span class="overlay"><i class="fa fa-heart-o" aria-hidden="true"></i></span> -->
						<!-- </a> -->
					<!-- </li> -->
				<!-- </ul> -->
			</div>
		</div>
	</div>
	<!-- End Gallery -->
	
	<!-- Start Contact -->
	<div id="contact" class="contact-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="title-box">
					<img class="img-fluid" src="https://grapesjs.fra1.digitaloceanspaces.com/Template/images/By-300x236.jpg" alt="single image">	
						<h2>Smt. & Mudavath Laxmi – Laxman</h2>
						<p>You can call  Javahar  ( bride brother) </p>
						<button style="color: #f0f0f0;background-color: crimson;border: none;width:140px;height:40px;">+91 9999999999</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Contact -->
	
	<!-- Start Footer -->
	<footer class="footer-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<p class="footer-company-name">All Rights Reserved. &copy; 2021 <a href="#">HD Live</a> Design By : Hanu Team</a></p>
				</div>
			</div>
		</div>
	</footer>
	<!-- End Footer -->
	
	<style type="text/css">
	.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

	<!-- ALL JS FILES -->
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/jquery.min.js"></script>
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/popper.min.js"></script>
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/bootstrap.min.js"></script>
    <!-- ALL PLUGINS -->
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/jquery.magnific-popup.min.js"></script>
    <script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/jquery.pogo-slider.min.js"></script> 
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/slider-index.js"></script>
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/smoothscroll.js"></script>
	<script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/form-validator.min.js"></script>
    <script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/contact-form-script.js"></script>
    <script src="https://grapesjs.fra1.digitaloceanspaces.com/Template/js/custom.js"></script>
</body>
</html>
<script>
setTimeout(function(){ 
	$("#root div").eq(1).removeClass("container").addClass("container-fluid");
}, 3000);
</script>
`


const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";

class GEditorExample extends Component {
	constructor() {
		super();
		this.state = {
			TEMPLATE_BODY: ""
		}
	}
	componentDidMount() {
		let searchs = this.props.location.search;
		let queryparam = querystring.parse(searchs);
		if (queryparam.urltitle == "" || queryparam.urltitle == null) {
			this.props.history.push('/auth');
		}
		//console.log(queryparam.urltitle);

		let requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ URL_TITLE_TX: queryparam.urltitle })
		};
		let SlrapiUrl = apiURL() + "streambyUrlTitle";
		fetch(SlrapiUrl, requestOptions)
			.then((response) => response.json())
			.then((reqdata) => {
				if (reqdata.statcode === 200) {
					let apiData = {
						data: JSON.stringify(reqdata.data),
						iv: def_Iv,
						key: def_Key
					}

					var AfterapiData = JSON.parse(dataDecrypt(apiData));
					console.log(AfterapiData);
					this.setState({ TEMPLATE_BODY: AfterapiData.TEMPLATE_BODY_TX });
				}
				else {
					alert(reqdata.statmsg);
					this.props.history.push('/auth');
				}
			});
	}
	render() {
		return (
			// <img src={logo} alt="Logo" />
			//   <div>{Parser(rawHTML)}</div>//newContent
			<InnerHTML html={this.state.TEMPLATE_BODY} />					
		);
	}
}

export default GEditorExample;