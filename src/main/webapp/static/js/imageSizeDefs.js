//图片大小定义
var __imageSizeDefs = {
	//默认图片（无匹配的）
	"image.default" : {
		width : 100,
		height : 100
	},
	//商品图片
	"image.goods" : {
		width : 200,
		height : 200
	},
	"image.goods.middle" : {
		width : 100,
		height : 100
	},
	"image.goods.small" : {
		width : 50,
		height : 50
	},
	"image.goods.big" : {
		width : 350,
		height : 350
	},
	"image.goods.tiny" : {
		width : 25,
		height : 25
	},
	//店铺照片
	"image.shop" : {
		width : 200,
		height : 160
	},
	//广告
	"image.advert" : {
		width : 200,
		height : 200
	},
	//广告（宽）
	"image.advert.wide" : {
		width : 730,
		height : 450
	},
	//头像
	"image.head" : {
		width : 50,
		height : 50
	},
	//徽标
	"image.logo" : {
		width : 100,
		height : 40
	},
	//图标
	"image.icon" : {
		width : 32,
		height : 32
	}
};
//
function getImageSizeDef(codeKey) {
	return __imageSizeDefs[codeKey];
}