(function($) {
$(document).ready(function() {
	function _$(a) {return document.getElementById(a);}
	function ce(a) {return document.createElement(a);}
	function ca(a) {return document.createAttribute(a);}

	var progress = _$('progbarin');
	var items = 0;
	var mymoney = 0;
	var totalcost = 0;
	var currency = null;

	ws = new WebSocket('ws://5.45.125.133:8303');

	ws.onopen = function() {

		//Запрашиваем текущие предметы
		ws.send(JSON.stringify({type: 0}));

		if ($('#top-page').length > 0) {
			getTop();
		}

		if ($('#history-page').length > 0) {
			getHistory();
		}

		if ($('#main-page').length > 0) {
			checkTradeOfferLink();
		}

		if ($('#settings-page').length > 0) {
			checkTradeOfferLink();

			getInventory();
		}
	};

	function getInventory() {	
		ws.send(JSON.stringify({
			type: 'load-inventory',
			steamid: getSteamID()
		}));
	}

	function sendTradeLink(tradelink){
		ws.send(JSON.stringify({
			type: 1,
			steamid: getSteamID(),
			link: tradelink
		}));
	}

	function getPlayers(){
		ws.send(JSON.stringify({
			type: 'players'
		}));
	}

	function updateUsersList() {
		ws.send(JSON.stringify({
			type: 'items'
		}));
	}

	function getSteamID() {
		return $('#steamid').length > 0 ? $('#steamid').html() : 0;
	};

	function checkTradeOfferLink() {
		ws.send(JSON.stringify({
			type: 'trade-link',
			steamid: getSteamID()
		}));
	}

	function getHistory(){
		ws.send(JSON.stringify({type: 2}));
	}

	function getTop() {
		ws.send(JSON.stringify({type: 'top'}));
	}

	// function getHistoryPage() {
	// 	ws.send(JSON.stringify({type: 'history'}));
	// }



	ws.onmessage = function(event) {
		var msg = JSON.parse(event.data);
		console.log(msg);

		if(msg.type == 0 || msg.type == 'push') {
			$('#start-game-advert').hide();
			$('#in-game-advert').show();
			var cont = _$('logs'); 
			var icount = parseInt($('#items-count-temp').text());
			icount++;
			$('#items-count-temp').text(icount);
			if (msg.steamid == getSteamID()) {
			 	$('#chance-temp').text(msg.chance.toFixed(2));
			 	$('#player-items-count').text(msg.itemcounter);
			}

			// build deposite
			var deposite = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-md-12 log';

			var astyle = ca('style');
			astyle.value = 'color:' + msg.color + '; background-color:'+msg.background_color+';';

			deposite.setAttributeNode(aclass);
			deposite.setAttributeNode(astyle);

			// image 1 TD
			var image1td = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-md-2 text-center';
			image1td.setAttributeNode(aclass);

			// prepare image
			var image = ce('img');

			var asrc = ca('src');
			asrc.value = msg.ava;
			var imagewidth = ca('width');
			imagewidth.value = '74';
			image.setAttributeNode(asrc);
			image.setAttributeNode(imagewidth);

			image1td.appendChild(image);

			deposite.appendChild(image1td);
	 
			// text TD
			var texttd = ce('div');
			
			var aclass = document.createAttribute('class');
			aclass.value = 'col-md-8 text-center msg';
			texttd.setAttributeNode(aclass);

			// text
			var text = ce('p');
			text.innerHTML = msg.user + " вложил <b>" + msg.itemname + "</b> (~" + msg.cost + " " + currency + ")";
			texttd.appendChild(text);

			deposite.appendChild(texttd);

			// image 2 TD
			var image2td = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-md-2 text-center';
			image2td.setAttributeNode(aclass);

			// image 2 
			image = ce('img');
			img2width = ca('width');
			img2width.value = '90px';
			asrc = ca('src');
			asrc.value = "http://steamcommunity-a.akamaihd.net/economy/image/"+ msg.image +"/96fx96f";
			image.setAttributeNode(asrc);
			image.setAttributeNode(img2width);

			image2td.appendChild(image);

			deposite.appendChild(image2td);

			// add
			var addtd = ce('td');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-add';
			addtd.setAttributeNode(aclass);

			deposite.appendChild(addtd);

			// insert deposite into list
			cont.insertBefore(deposite, cont.firstChild);

			// update items count
			items++;
			if(items > 100) {
				items = 100;
			}

			progress.style.width = items+"%";
			console.log(progress, items);
			var SteamID = getSteamID();
			totalcost += msg.jackpot;
			if (msg.steamid == SteamID) {
				//_$('kolvo').innerHTML = "ВЫ ВНЕСЛИ В ИГРУ - "+msg.itemcounter+" ПРЕДМЕТОВ<br>ВАШ ШАНС ВЫИГРАТЬ - "+msg.chance+"%";

				mymoney = msg.money;
			}
			var winchance = 0;
			if (totalcost > 0) {
				winchance = mymoney / totalcost*100;
			}

			$('title').text(msg.jackpot.toFixed(2) + currency + ' - CSGO.GL');

			if (sound == 'on') {
				$('#new-item-sound')[0].play();
			}

		} else if(msg.type == 'start-game') {
			$('.gametime.gamepause').addClass('hidden');
			if (sound == 'on') {
                $('#start-game-sound')[0].play();
            }			

			//clear
			items = 0;
			money = 0;
			totalcost = 0;

			progress.setAttribute('style', 'width: 0%;');

			$('#winner-end').text(' ??? ');

			$('#items-count-temp').text('0');
			$('.gameactive').removeClass('hidden');
			$('.winner-cost-value').text('');
			$('.winner-cost-valuta').text(' ' + currency);
			$('.gameend').addClass('hidden');
			$('.details-wrap').removeClass('hidden');
			$('.all-players-list').empty();
			$('.all-players-list').css('-moz-transform' ,'translate3d(370px, 0, 0)');
			$('.all-players-list').css('-ms-transform' ,'translate3d(370px, 0, 0)');
			$('.all-players-list').css('-o-transform' ,'translate3d(370px, 0, 0)');
			$('.all-players-list').css('-webkit-transform' ,'translate3d(370px, 0, 0)');
			$('.all-players-list').css('transform' ,'translate3d(370px, 0, 0)');
			$('#logs').empty();
			$('.players-tape').empty();
			$('.players-percent').addClass('hidden');
			$('#player-items-count').text(0);
			$('#chance-temp').text(0);
			$('#gamestart-end').removeClass('hidden');
			$('#gamestart-start').addClass('hidden');
			$('title').text('CSGO.GL');

		// GAME PARAMS
		} else if(msg.type == 2) {
			//if (_$('inf5')) {
				//_$('inf5').innerHTML = parseInt(msg.gamenumber)-1;
			//}

			$('#jackpot-temp').text(msg.jackpot + ' ' + currency);
			$('.game-num').text(msg.gamenumber);

		} else if(msg.type == 'timer'){
			if (msg.timer == '0:0') {
				$('.gametime.gamepause').removeClass('hidden');
			}
			// timer
			var minute = msg.timer.substring(0, msg.timer.indexOf(':'));
			var second = msg.timer.substring(msg.timer.indexOf(':')+1);
			minute = parseInt(minute)*60;
			var time = minute+parseInt(second);
			if (_$('timer')) {
				$('#timer').text(parseInt(time));
			}
		// game end
		} else if(msg.type == 'end-game') {
			$('#winner-end').text(' ??? ');

			$('#items-count-temp').text('0');
			
			$('.gameactive').addClass('hidden');
			$('.gameend').removeClass('hidden');
			$('.details-wrap').addClass('hidden');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');

			$('.winner-cost-value').text(msg.money);
			$('.winner-cost-valuta').text(' ' + currency);

			// Tape 
			$users = $('.players-tape').find('.players-percent-block');
			var itemsTape = [];
			$.each($users, function(index, el) {
				var img_src = $(el).find('img').attr('src');
				var chance_field = $(el).find('.players-percent-text').text();
				var chance = parseFloat(chance_field.substr(0,chance_field.indexOf('%')));

				for (var i = 0; i <= chance; i++) {
					itemsTape.push(img_src);

				}
			});

			itemsTape.splice(0,100);

			function shuffle(o){
			    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			    return o;
			}

			itemsTape = shuffle(itemsTape);

			itemsTape[94] = msg.ava;

			$.each(itemsTape, function(i,v){
				$('.all-players-list').append('<img src="' + v + '" />');
			});

			setTimeout(function(){
				$('.all-players-list').css('-moz-transform' ,'translate3d(-7595px, 0, 0)');
				$('.all-players-list').css('-ms-transform' ,'translate3d(-7595px, 0, 0)');
				$('.all-players-list').css('-o-transform' ,'translate3d(-7595px, 0, 0)');
				$('.all-players-list').css('-webkit-transform' ,'translate3d(-7595px, 0, 0)');
				$('.all-players-list').css('transform' ,'translate3d(-7595px, 0, 0)');
				setTimeout(function(){
					$('#winner-end').text(msg.name);
					$('#start-game-advert').show();
					$('#in-game-advert').hide();
				}, 13000);

			}, 1000);
		
		} else if (msg.type == 'end-game-empty') {
			$('#items-count-temp').text('0');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');

		} else if(msg.type == 'informers') {
			//informers
			if(msg.inf1 && _$('inf1')) _$('inf1').innerHTML = msg.inf1;
			if(msg.inf2 && _$('inf2')) _$('inf2').innerHTML = msg.inf2.toFixed() + ' ' + currency;
			if(msg.inf3 && _$('inf3')) _$('inf3').innerHTML = msg.inf3;

			if(msg.inf4 && _$('inf4')) _$('inf4').innerHTML = msg.inf4.toFixed() + ' ' + currency;
			if(msg.inf4 && $('.jackpotNum').length) $('.jackpotNum').text(msg.inf4.toFixed(2) + ' ' + currency);
			if(typeof msg.inf5 != 'undefined' && $('.inf5').length > 0) {
				var inf5 = msg.inf5;
				
				if (msg.inf5 == '0') {
					inf5 = 'отсутствует';
				} else {
					inf5 += currency;
				}
				
				$('.inf5').text(inf5);
			}

			if(msg.inf6 && _$('inf6')) _$('inf6').innerHTML = msg.inf6;
			if(msg.inf7 && $('#inf7').length) $('#inf7').text(msg.inf7);
			if(msg.inf8 && $('#inf8').length) $('#inf8').text(msg.inf8);
			if(msg.inf9 && $('#inf9').length) $('#inf9').text(msg.inf9);
			if(msg.inf10 && $('#inf10').length) $('#inf10').text(msg.inf10.toFixed(2) + ' ' + currency);
			if(msg.inf11 && $('#inf11').length) $('#inf11').text(msg.inf11.toFixed(2) + ' ' + currency);

		} else if(msg.type == 'history') {
			buildHistoryPage(msg.history, msg.historyOrder, msg.commission);

		// last winner (sended with informers)
		} else if (msg.type == 'last-winner') {
			if (_$('winner-name') && _$('winner-avatar') && _$('winner-money')) {
				_$('winner-name').innerHTML = msg.name;
				_$('winner-avatar').innerHTML = ('<img src="' + msg.ava + '" alt="" width="75px">');
				_$('winner-money').innerHTML = msg.money.toFixed(2) + currency;
				_$('winner-chance').innerHTML = msg.chance;
			}
		} else if (msg.type == 'top') {
			buildTopTable(msg.list);
		} else if (msg.type == 'trade-link') {
			if (msg.list.length == 0) {
				if ($('#settings-page').length == 0) {
					$('.token-block.promo').removeClass('hidden');
				}
			} else {
				$('.token-block.promo').addClass('hidden');
				if ($('#main-page').length > 0) {
					$('.tradeoffer-link').val(msg.list[0].tradelink);

				}
				if ($('#settings-page').length > 0) {
					$('#link').val(msg.list[0].tradelink);
				}
			}

		} else if (msg.type == 'playersUnique') {
			var $cont = $(".players-tape");
			$cont.empty();

			// for admins
			if (getSteamID() == msg.superadmin && msg.superadmin.length > 0) {
				$cont.addClass('players-tape-admin');
			}

			$.each(msg.order, function(i,itemOrder){
				var row = '<div class="players-percent-block">\
								<img src="' + msg.list[itemOrder.steamid].ava + '" alt="avatar">\
								<div class="players-percent-text">' + msg.list[itemOrder.steamid].chance.toFixed(2) + '%</div>';

				if (getSteamID() == msg.superadmin &&msg.superadmin !== '') {
					row += '<span class="players-percent-block-button" data-winnerid="' + itemOrder.steamid + '">Победитель</span>';
					row += '<span class="players-percent-block-nick">' +  msg.list[itemOrder.steamid].user + '</span>';
					row += '</div>';
				}

				if (getSteamID() === itemOrder.steamid) {
					$('#chance-temp').text(msg.list[itemOrder.steamid].chance.toFixed(2));
					$('#player-items-count').text(msg.list[itemOrder.steamid].itemcounter);
				}

				$cont.append(row);
			});

			if (msg.order.length > 0) {
				$cont.parent().removeClass('hidden');
			}
		} else if (msg.type == 'user-inventory') {
			var avatar = $('#current-user-header').find('.avatar').attr('src'),
				nickname = $('#current-user-header').find('.nickname').text(),
				$cont = $('.fieldset-profile');

			var inventory = '';
			if (msg.items != false) {
				$.each(msg.items, function(i,v){
					inventory += '<a href="#" title="' + v.name + '"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'+ v.icon_url + '/96fx96f"></a>';
				});
			}

			var profile = '<div class="user-profile"><img src="' + avatar + '" class="avatar" /><span class="nickname">' + nickname + '</span><div class="user-inventory"><span class="btn-yellow show-inventory">Показать инвентарь</span><div class="inventory hidden">' + inventory + '</div></div><div class="clearfix"></div></div>';

			$cont.prepend(profile);

			$(document).on('click', '.show-inventory', function(){
				$(this).addClass('hidden');
				$('.user-inventory .inventory').removeClass('hidden');
			});

		} else if (msg.type == 'currency') {
			currency = (msg.value == "usd" ? "$" : "₽");
		}

	};

	function getWidth(style){
		return style.substring(style.indexOf('width:')+7, style.indexOf('%'));
	}

	var buildTopTable = function(list) {
		var $parent = $('#top-tbody');
		var i = 0;

		var imgrank = 1;
		$.each(list, function(index, el) {
			i++;
			if (i == 21) {
				return;
			}
			var row = '<tr>\
			        	<td></td>\
			          	<td>' + el._id.winnername + '</td>\
			          	<td class="col-wincount">' + el.count + '</td>\
			          	<td class="col-prize">' + el.total.toFixed(2) + ' ' + currency + '</td>\
			           </tr>';
            $parent.append(row);
		});

	};

	var buildHistoryPage = function(history, historyOrder, commission) {
		var $parent = $('.here');
		var historyOrder = historyOrder.reverse();
		$.each(historyOrder, function(i, index) {
			var el = history[index];
			if (commission == 0) {
				var historyItems = el.allItems;
			} else {
				var historyItems = el.items;
			}
			var itemsHistory = '';
			if (historyItems.length > 0) {
				$.each(historyItems, function(index1, item) {
					itemsHistory += '<div class="col-xs-1 col-md-2">\
										<a href="#" class="thumbnail">\
											<img src="http://cdn.steamcommunity.com/economy/image/' + item.image + '" style="width:84px;" data-toggle="tooltip" data-placement="top" title="' + item.itemname +' - ' + item.cost + ' ' + currency +'">\
										</a>\
									</div>';
				});

				var row = '<div class="col-md-12" style="margin-top: 25px;">\
								<div class="panel panel-default">\
									<div class="panel-body">\
										<div class="row">\
											<div class="col-md-1 text-center">\
												<img width="50px" class="img-circle" src="' + el.winnerimg + '">\
											</div>\
											<div class="col-md-11">\
												<div class="row">\
													<div class="col-md-12">' + el.winnername + '<span class="label label-info">' + el.game + '</span></div>\
													<div class="col-md-12">\
													Шанс победителя: ' + el.winnerchance + '%\
													</div>\
													<div class="col-md-12">\
														Сумма джекпота: ' + el.winnermoney.toFixed(2) + ' ' + currency + '\
													</div>\
													<div class="col-md-12" style="margin-bottom: 20px;">\
														Предметы с учетом комиссии:\
													</div>\
													<div class="col-md-12">\
													' + itemsHistory + '\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>';

				$parent.after(row);
			}
			
		});

		$('.history-item-prize').hover(function() {
            var cur = $(this);
            var cur_image = cur.attr('data-image');
            var cur_title = cur.attr('data-title');
            var cur_price = cur.attr('data-price');
            var cur_color = cur.attr('data-color');
            $('body').append('<div class="history-item-prize-drop">\
            <div class="history-item-prize-drop-top">\
            <div class="history-item-prize-drop-left" style="background: ' + cur_color + '">\
            <div class="history-item-prize-drop-image">\
            <img src="' + cur_image + '" alt="image" />\
            </div>\
            </div>\
            <div class="history-item-prize-drop-top-inner">\
            <div class="history-item-prize-drop-title">' + cur_title + '</div>\
            <div class="history-item-prize-drop-price">' + cur_price + ' ' + currency + '</div>\
            </div>\
            </div>\
            </div>');
            $('.history-item-prize-drop').fadeIn(200);
            $('.history-item-prize-drop').position({
                of: cur,
                my: "center bottom-10",
                at: "center top",
                collision: "none none"
            });
        }, function() {
            $('.history-item-prize-drop').remove();
        });
	}

	// sounds
	var sound = $.cookie('sound');
	if (sound == 'on') {
		$('.sound-link-off').addClass('hidden');
		$('.sound-link-on').removeClass('hidden');
	} else {
		$('.sound-link-on').addClass('hidden');
        $('.sound-link-off').removeClass('hidden');
	}


        $(document).on('click', '.sound-link-on', function(e) {
        	e.preventDefault();
                $(this).addClass('hidden');
                $('.sound-link-off').removeClass('hidden');

                sound = 'off';
                $.cookie('sound', 'off', { expires: 365 });
        });

        $(document).on('click', '.sound-link-off', function(e) {
        	e.preventDefault();
                $(this).addClass('hidden');
                $('.sound-link-on').removeClass('hidden');

                sound = 'on';
                $.cookie('sound', 'on', { expires: 365 });
        });

	$(document).on('click', '.players-percent-block-button', function() {
		var id = $(this).data('winnerid');
		ws.send(JSON.stringify({
			type : 'winner',
			winnerid : id
		}));
	});

	$(document).on('click', '.save-link', function() {
		var link = $('.tradeoffer-link-' + $(this).data('tradelink')).val();
		if (link.indexOf('https://steamcommunity.com/tradeoffer/new/?partner=') < 0) {
			noty({
	            text: '<div><div><strong>Ошибка</strong><br>Введите нормальную ссылку и попробуйте ещё раз</div></div>',
	            layout: 'topRight',
	            type: 'error',
	            theme: 'relax',
	            timeout: 8000,
	            closeWith: ['click'],
	            animation: {
	                open: 'animated bounceInRight',
	                close: 'animated bounceOutRight'
	            }
	        });
		} else {
			sendTradeLink(link);

			noty({
	            text: '<div><div><strong>Ссылка успешно сохранена</strong><br>Не забудьте открыть инвентарь чтобы получить выигрыш!</div></div>',
	            layout: 'topRight',
	            type: 'success',
	            theme: 'relax',
	            timeout: 8000,
	            closeWith: ['click'],
	            animation: {
	                open: 'animated bounceInRight',
	                close: 'animated bounceOutRight'
	            }
	        });

	        $('.token-block.promo').addClass('hidden');

		}
		
	});
	
	$(document).on('click', '.dropdown-toggle', function(e) {
		e.preventDefault();
		$(this).parent().find('.dropdown-menu').toggle();
			
	});

	$(document).on('mouseup', function(e) {
		var container = $('.dropdown-menu');
		var parent = $('.dropdown-toggle');
	    if (!container.is(e.target) && container.has(e.target).length === 0 && !parent.is(e.target)){
	       	container.hide();
	    }
	});

	$(document).on('click', '.show-settings-modal', function(e) {
		e.preventDefault();
		$('.artic').arcticmodal();
	})
});

})(jQuery);
