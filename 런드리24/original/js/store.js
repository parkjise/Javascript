
const scrollbar = document.querySelector('.store-list-scrollbar');
const content = document.querySelector('.store-list');
let isDragging = false;
let startY, scrollTop;


let storeParam = {
    storeName : ""
    , area : ""
    , area2 : ""
    , page : 1
    , limit : 5
};
let mapOptions = {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 10
};
let map = new naver.maps.Map('map', mapOptions);
let markers = [];  // 마커들을 저장할 배열
let infoWindows = [];  // 인포를 저장할 배열
$(function() {
     map = new naver.maps.Map('map', mapOptions);
    mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.9780),
        zoom: 10
    };

    // 시/도 세팅
    $.ajax({
        url: '/wp-json/custom/v1/get_area',  // REST API URL
        data: {},
        success: function(data) {
            $('#area').empty();  // 기존 시/도 리스트 초기화
            $('#area').append('<option value="">광역시/도</option>');
            data.data.forEach(function(row) {
                $('#area').append('<option value="' + row.area + '">' + row.area + '</option>');
            });
        }
    });

    // 시/도 변경시
    $('#area').change(function(event) {
        // 시/군/구 세팅
        $.ajax({
            url: '/wp-json/custom/v1/get_area2',  // REST API URL
            data: {area : $('#area').val()},
            success: function(data) {
                $('#area2').empty();  // 기존 시/군/구 리스트 초기화
                $('#area2').append('<option value="">시/군/구</option>');
                data.data.forEach(function(row) {
                    $('#area2').append('<option value="' + row.area2 + '">' + row.area2 + '</option>');
                });
            }
        });
    });

    // 매장명/주소 엔터키
    $('#store-name').keypress(function(event) {
        if (event.which == 13) {
        event.preventDefault(); // 기본 동작 방지
        storeParam.storeName = $("#store-name").val();;
        storeParam.area = "";
        storeParam.area2 = "";
        storeParam.page = 1;
        setStoreList();
        }
    });
    // 매장명/주소 검색버튼 클릭시
    $('#search-btn1').click(function(event) {
        storeParam.storeName = $("#store-name").val();;
        storeParam.area = "";
        storeParam.area2 = "";
        storeParam.page = 1;
        setStoreList();
    });
    // 지역 검색버튼 클릭시
    $('#search-btn2').click(function(event) {
        storeParam.storeName = ""
        storeParam.area = $("#area").val();
        storeParam.area2 = $("#area2").val();
        storeParam.page = 1;
        setStoreList();
    });

    // 지역 검색버튼 클릭시
    $('.store-tab').click(function(event) {
        $(this).addClass("on");
        $(this).siblings().removeClass('on');
        let index = $(this).index();
        if(index == 0){
            $('.search .search-block').eq(0).show();
            $('.search .search-block').eq(1).hide();
        } else {
            $('.search .search-block').eq(0).hide();
            $('.search .search-block').eq(1).show();
        }
    });
    $('#search-btn1').click();
});

// 네이버 지도 포커스
function setFocus(map, lng, lat, zoom) {
    var latitude = parseFloat(lat);  // 클릭한 매장의 위도
    var longitude = parseFloat(lng);  // 클릭한 매장의 경도

    // 클릭한 매장의 위치로 지도 이동 및 줌인
    let newCenter = new naver.maps.LatLng(longitude, latitude);
    map.setZoom(zoom);
    map.setCenter(newCenter);
}

// 네이버 지도 마커 모두 삭제
function clearMarkers() {
    markers.forEach(function(marker) {
        marker.setMap(null);  // 마커를 지도에서 제거
    });
    markers = [];  // 배열 초기화
    infoWindows = [];  // 배열 초기화
}

// 매장 리스트 페이지 이동
function goSearch(page) {
    storeParam.page = page;
    setStoreList();
}

// 매장 리스트 세팅
function setStoreList(area, area2, storeName) {
    if ($(window).width() <= 1023) {
        storeParam.limit = 10;
    } else {
        storeParam.limit = 99999;
    }
   fetch(ajax_object.ajax_url, {
        method: 'POST'
        , headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        , body: new URLSearchParams({
            'action': 'fetch_store_data'
            , 'nonce': ajax_object.nonce
            , 'area': storeParam.area
            , 'area2': storeParam.area2
            , 'store_name': storeParam.storeName
            , 'page': storeParam.page
            , 'limit': storeParam.limit
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            clearMarkers();  // 기존 마커 삭제
            let storeListDiv = document.getElementById("store-list");
            storeListDiv.innerHTML = ""; // 기존 리스트 초기화
            $(".store-list").empty();
            $(".search-paging").empty();

            let idx = 0;
            $("#store-cnt").text(data.data[0].CNT + "개");
            data.data.forEach(function(store) {
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(store.longitude, store.latitude),
                    map: map,
                    icon: {
                        url: "https://laundry24.net/wp-content/themes/laundry/images/v2/store/marker.svg?v=202410184",
                        size: new naver.maps.Size(77, 72),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(38.5, 72)
                    }
                });
                markers.push(marker);  // 새 마커를 배열에 저장

                const urlLink = store.urlLink === null ? 'https://map.naver.com/?lng=' + store.latitude + '&lat='+ store.longitude + '&title='+ store.name : store.urlLink;

                let infoWindow = new naver.maps.InfoWindow({
                    borderColor: "#0AC290",
                    borderWidth: 1,
                    content: '<div class="store-box"><div class="title">'
                        + store.name + '<img src="https://laundry24.net/wp-content/themes/laundry/images/v2/store/close.svg" id="closeBtn"></div><div class="addr">'
                        + store.address + '</div><div class="link"><a target="_blank" href="'
                        + urlLink + '"><img src="https://laundry24.net/wp-content/themes/laundry/images/v2/store/link.svg"></a></div></div>'
                });
                infoWindows.push(infoWindow);  // 새 인포를 배열에 저장

                naver.maps.Event.addListener(marker, "click", function() {
                    // 로우 선택 초기화
                    $('.store-row1').removeClass('on');
                    // 로우 선택
                    let row = 0;
                    markers.forEach(function(value, index) {
                        if (value === marker) {
                            row = index;
                        }
                    });
                    $('.store-row1').eq(row).addClass('on');
                    $('.store-row1').eq(row).attr("tabindex", -1).focus();
                    // 마커 줌인
                    setFocus(map, store.longitude, store.latitude, 15);
                    // 지도 포커스
                    $("#map").attr("tabindex", -1).focus();
                    // 마커 클릭 시 정보 창 열기
                    infoWindow.open(map, marker);
                    // 닫기버튼 이벤트 추가
                    $('#closeBtn').click(function(event) {
                        infoWindow.close();
                    });
                });

                // 매장 리스트 추가
                let storerow1 = document.createElement("div");
                storerow1.className = "store-row1";
                storerow1.dataset.seq = idx;
                storerow1.dataset.lat = store.latitude;
                storerow1.dataset.lng = store.longitude;
                let storerow2 = document.createElement("div");
                storerow2.className = "store-row2";
                let storename = document.createElement("div");
                storename.className = "store-name";
                storename.innerText = store.name;
                let storeaddr = document.createElement("div");
                storeaddr.className = "store-addr";
                let storeaddrp = document.createElement("p");
                storeaddrp.className = "p";
                storeaddrp.innerText = store.address;

                storeaddr.appendChild(storeaddrp);
                storerow2.appendChild(storename);
                storerow2.appendChild(storename);
                storerow2.appendChild(storeaddr);
                storerow1.appendChild(storerow2);
                storeListDiv.appendChild(storerow1);
                idx++;
            });
            // 페이징
            let page = '<ul>';
            const searchPage = parseInt(storeParam.page, 10);
            const maxPage = parseInt(data.data[0].PAGE, 10);
            const startPage = (searchPage % 5) != 0 ? searchPage - (searchPage % 5) + 1 : searchPage - (searchPage % 5) - 4;
            const endPage = maxPage > startPage + 4 ? startPage + 4 : maxPage;

            if(searchPage > 5){
                page += '<li class="page-item">';
                page += '<a class="gopage" href="javascript:goSearch(1)"><<</a>';
                page += '</li>';
                page += '<li class="page-item">';
                page += '<a class="gopage" href="javascript:goSearch(' + (startPage - 1) + ')"><</a>';
                page += '</li>';
            }

            for(let i=startPage; i<=endPage; i++){
                if(i==searchPage){
                    page += '<li class="page-item now">'
                        + i
                        + '</li>';
                } else {
                    page += '<li class="page-item">'
                        + '<a class="go-page" href="javascript:goSearch(' + i + ')">' + i + '</a>'
                        + '</li>';
                }
            }

            if(endPage < maxPage){
                page += '<li class="page-item">';
                page += '<a class="gopage" href="javascript:goSearch(' + (endPage + 1) + ')">></a>';
                page += '</li>';
                page += '<li class="page-item">';
                page += '<a class="gopage" href="javascript:goSearch(' + maxPage + ')">>></a>';
                page += '</li>';
            }
            page +=  '</ul>';
            $(".search-paging").append($(page));

            // 매장 리스트 줌인
            let bounds = new naver.maps.LatLngBounds();
            markers.forEach(function(marker) {
                bounds.extend(marker.getPosition());  // 각 마커의 위치를 바운드에 추가
            });
            map.fitBounds(bounds);  // 모든 마커가 보이도록 지도 범위 및 줌 조정

            // 매장 리스트 클릭시
            $('.store-row1').click(function(event) {
                event.preventDefault();
                let infoWindow = infoWindows[$(this).data("seq")];
                // 로우 선택
                $('.store-row1').removeClass('on');
                $(this).addClass("on");
                // 마커 줌인
                setFocus(map, $(this).data("lng"), $(this).data("lat"), 15);
                // 마커 클릭 시 정보 창 열기
                infoWindow.open(map, markers[$(this).data("seq")]);
                // 닫기버튼 이벤트 추가
                $('#closeBtn').click(function(event) {
                    infoWindow.close();
                });

                // 지도 포커스
                $("#map").attr("tabindex", -1).focus();
            });
        } else {
            clearMarkers();  // 기존 마커 삭제
            let storeListDiv = document.getElementById("store-list");
            storeListDiv.innerHTML = ""; // 기존 리스트 초기화
            $("#store-cnt").text("0개");
        }
        $("#store-list").height();

        if ($(window).width() <= 1023) {
            $(".search-paging").show();
            $("#map").css("position", "relative");

            $("#store .container .search").css('height', (300 + $("#store-list").height()) + "px");
            $("#store .container .search .overlap-group").css('height', (300 + $("#store-list").height()) + "px");

        } else {
            $(".search-paging").hide();
            $("#map").css("position", "absolute");

            $("#store .container .search").css('height', "550px");
            $("#store .container .search .overlap-group").css('height', "550px");
        }
    })
    .catch(error => console.error('Error:', error));
}
function isUTF8(str) {
  try {
    decodeURIComponent(escape(str));
    return true;
  } catch (e) {
    return false;
  }
}

function isANSI(str) {
    if(str == null) return "";
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      return false;
    }
  }
  return true;
}

function createComparisonFilter(comparisonValue) {
    return function(element) {
        return $(element).data('seq') === comparisonValue;
    };
}