var request = require('request');
var fs = require('fs');
var path = require("path");

var errorUrls = [
    'http://pupupula.net/spring/?ADTAG=wbo&k=pula&d=2&CKTAG=mta_share.share_friend',
    'http://pingjs.qq.com/h5/stats.js?v2.0.4'
];
var urls = [

'http://pupupula.net/spring/style-mobile.dd0ea.css',
'http://res.wx.qq.com/open/js/jweixin-1.2.0.js',
'http://pupupula.net/spring/loading_dog.017fb.gif',
'http://pupupula.net/spring/share_icon_1.350af.png',
'http://pupupula.net/spring/share_icon_2.adcf8.png',
'http://pupupula.net/spring/snap_save.6eb68.png',
'http://pupupula.net/spring/press_save.9e0e4.png',
'http://pupupula.net/spring/src/settings.1c26d.js',
'http://pupupula.net/spring/loading.480f7.png',
'http://pupupula.net/spring/main.db1be.js',
'http://pupupula.net/spring/cocos2d-js-min.a38c4.js',

'http://pupupula.net/spring/src/assets/plugins/axios.min.05d46.js',
'http://pupupula.net/spring/src/assets/plugins/qrcode.aac05.js',
'http://pupupula.net/spring/src/project.6a2e9.js',
'http://pupupula.net/spring/res/import/08/086588aae.f270a.json',
'http://pupupula.net/spring/res/raw-assets/Audio/354132__betterchinese__frog-croaking-sound-effect.f335b.wav',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Room/Room.adb50.png',
'http://pupupula.net/spring/res/raw-internal/image/default_sprite_splash.cea68.png',
'http://pupupula.net/spring/res/raw-assets/UI/logo_single.13732.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_sofa.fac75.png',
'http://pupupula.net/spring/res/raw-assets/Texture/singleColor.e5136.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_adult.f458f.png',
'http://pupupula.net/spring/res/raw-assets/FX/snow.c27cf.plist',
'http://pupupula.net/spring/res/raw-assets/UI/icon_kid.c28dd.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_cat.d56f8.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_dog.64913.png',
'http://pupupula.net/spring/res/raw-assets/UI/mini.83784.png',
'http://pupupula.net/spring/res/raw-assets/UI/frame.7ec30.png',
'http://pupupula.net/spring/res/raw-assets/UI/remove.e80f2.png',
'http://pupupula.net/spring/res/raw-assets/UI/resize.65162.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/01.40935.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/12.11636.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/main_face.e5acf.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/01.56d74.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/01.44c57.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/05.f6b7c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/01.38768.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/11.fd61c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/main_face.5dc16.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/04.68ef8.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/07.a1a09.png',
'http://pupupula.net/spring/res/raw-assets/UI/img_male.9b4a5.png',
'http://pupupula.net/spring/res/raw-assets/UI/img_female.e6baf.png',
'http://pupupula.net/spring/res/raw-internal/image/default_panel.cdbc9.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_hair.041de.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_hair_inv.74660.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_cloth_inv.9b5f8.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_cloth.d474a.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_pants_inv.43148.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_pants.68975.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_glass_inv.1797a.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_glass.14506.png',
'http://pupupula.net/spring/res/raw-internal/image/default_progressbar.69ff9.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_beard_inv.cd11a.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_beard.f525e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/03.3a56f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/b01.f4770.png',
'http://pupupula.net/spring/res/raw-assets/Prefabs/Turtle/tail.c41e4.png',
'http://pupupula.net/spring/res/raw-assets/Prefabs/Turtle/head.5c604.png',
'http://pupupula.net/spring/res/raw-assets/Prefabs/Turtle/leg.92091.png',
'http://pupupula.net/spring/res/raw-assets/Prefabs/Turtle/shell.b8b47.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/06.8dca4.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/06.0e61f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/01.8e65f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/02.0dbe7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/13.6a319.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/04.fbdd1.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/05.809da.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/03.36d46.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/06.b55ff.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/08.74848.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/12.460e2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/09.f0c90.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/07.29edd.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/10.0fbe5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/11.600bc.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/14.4e194.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/15.6c342.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/16.cabda.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/17.9eec4.png',
'http://pupupula.net/spring/res/raw-assets/FX/snow.b784c.png',
'http://pupupula.net/spring/res/raw-assets/Texture/Color/UI/web_qr_slogan.6480f.png',
'http://pupupula.net/spring/res/raw-assets/Texture/Color/UI/web_slogan.366f0.png',
'http://pupupula.net/spring/res/raw-assets/UI/1518283650.74540.png',
'http://pupupula.net/spring/res/raw-assets/UI/2018.02.12/search_pula.fb38c.png',
'http://pupupula.net/spring/res/raw-assets/UI/weixin.d9c7e.png',
'http://pupupula.net/spring/res/raw-assets/UI/2018.02.12/logo.11205.png',
'http://pupupula.net/spring/res/raw-assets/UI/icon_camera.8e92f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/22.194ec.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/20.fda25.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/21.53e5d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/19.83d82.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/18.e9498.png',
'http://pupupula.net/spring/res/raw-assets/resources/data/offset.f089f.json',
'http://pupupula.net/spring/res/import/55/5512b575-ee4c-4db2-8853-1cd8a04f3aae.f218b.json',
'http://pupupula.net/spring/res/import/3b/3b4d488c-f406-4483-a6d2-c35297109e13.1cc52.json',
'http://pupupula.net/spring/res/import/8a/8acbd7cb-b70e-4bf4-b38f-232499f4aa8d.7090b.json',
'http://pupupula.net/spring/res/import/f0/f0818063-4d07-4913-8b01-cbec8001f2ee.01097.json',
'http://pupupula.net/spring/res/import/b1/b1632a9a-d136-4b79-858b-f06aab5cdd78.a1490.json',
'http://pupupula.net/spring/res/import/34/34412682-0fd0-40d1-8bb0-9d43fdd5abae.8a54a.json',
'http://pupupula.net/spring/res/import/4d/4d2c5132-b98f-4151-8db0-f41846163f4a.a1237.json',
'http://pupupula.net/spring/res/import/66/66348978-052d-4ae6-8d91-6d0112eb42cd.7be1d.json',
'http://pupupula.net/spring/res/import/14/145dc18f-73dc-4460-844e-7aec8c30b27b.87377.json',
'http://pupupula.net/spring/res/import/f7/f7f83737-0521-46f1-a0f2-68f6bbabf66c.cf5af.json',
'http://pupupula.net/spring/res/import/4c/4c5234cf-3ec6-472c-9bd0-900e582a1d60.6f701.json',
'http://pupupula.net/spring/res/import/1a/1af2a5a3-dd61-4389-acae-9448622124b2.800c0.json',
'http://pupupula.net/spring/res/import/08/08d4a9a1-ffb0-4add-9ab4-8a35f002277a.a3452.json',
'http://pupupula.net/spring/res/import/78/78a0558a-ecb2-4744-a0f5-2f48f432d4f8.b02bc.json',
'http://pupupula.net/spring/res/import/8a/8a8cf174-44b3-4abe-8451-20dcef75d6a3.3f9d6.json',
'http://pupupula.net/spring/res/import/cf/cf09243b-66df-4b46-8b39-a1b91437a774.f41db.json',
'http://pupupula.net/spring/res/import/bf/bff22ce2-39e5-42c1-b130-00d48c4be7a1.6732f.json',
'http://pupupula.net/spring/res/import/77/7725ba5a-5fba-429e-853a-d91f029f73a8.a08fa.json',
'http://pupupula.net/spring/res/import/63/635cbab3-1221-4b4c-b474-bb178c2c3103.686bf.json',
'http://pupupula.net/spring/res/import/46/46cc1bbb-977f-4c70-8436-b811c9c09d6b.fa90a.json',
'http://pupupula.net/spring/res/import/67/675bc272-de51-4eba-b4b2-c93d5a61e9eb.9c586.json',
'http://pupupula.net/spring/res/import/c1/c1ad671f-f3ed-4dc1-88c2-cb1b5e097d0b.b1462.json',
'http://pupupula.net/spring/res/import/b4/b4db0b3b-c52a-4bda-96bb-0953cd1d2070.dff33.json',
'http://pupupula.net/spring/res/import/80/80ee6d06-d378-4bb3-a5c3-f088ebb4f601.66bb5.json',
'http://pupupula.net/spring/res/import/8d/8dc4f4fa-a7d2-4645-8bd8-69628aee7cf7.56c41.json',
'http://pupupula.net/spring/res/import/33/33822b23-d484-446e-8fda-fffaf9de5c22.79080.json',
'http://pupupula.net/spring/res/import/fc/fcf85c38-08ad-4044-bb41-ab5363a15eeb.b568d.json',
'http://pupupula.net/spring/res/import/79/79341a3d-67d1-4116-b9ca-1b5abd3a0d34.f7819.json',
'http://pupupula.net/spring/res/import/f6/f613bffa-91c1-4c6b-b0ee-98276f95de47.c8262.json',
'http://pupupula.net/spring/res/import/f4/f4ea8494-5ef0-4886-bbaf-76edb824be2b.fb409.json',
'http://pupupula.net/spring/res/import/0f/0fcdf414-fd8a-4c2d-a55a-16ea63739567.f78da.json',
'http://pupupula.net/spring/res/import/21/21d6c602-a8b4-4820-a3c4-ec07d320bbf8.6f6bf.json',
'http://pupupula.net/spring/res/import/34/349f7830-bcc0-4ca7-89a2-024b9417fe7d.8b110.json',
'http://pupupula.net/spring/res/import/01/010d21a2-cb29-4705-a5ae-54bf9906edae.29c52.json',
'http://pupupula.net/spring/res/import/3a/3af97e0c-9e18-4e09-9e33-00aa7dae3c5d.51ac9.json',
'http://pupupula.net/spring/res/import/65/65edabb2-39c3-4b87-bc52-9742978cfeb3.efd20.json',
'http://pupupula.net/spring/res/import/9a/9afde127-8442-4788-a167-8622585b92a2.9e5d7.json',
'http://pupupula.net/spring/res/import/04/04688ff2-efb1-44e4-84e1-81272aaf25de.bf411.json',
'http://pupupula.net/spring/res/import/fe/fe0c392e-c634-4c11-a31a-e2d49508610c.39e97.json',
'http://pupupula.net/spring/res/import/a2/a242114e-b26c-4e9a-b904-9a98067b973f.ecbdb.json',
'http://pupupula.net/spring/res/import/f8/f8d53079-0f22-4635-9179-9d2d0c8d70a9.6e6bc.json',
'http://pupupula.net/spring/res/import/1a/1aa646ce-c971-4251-b383-f61501869af1.f2a5b.json',
'http://pupupula.net/spring/res/import/98/980a33a4-27de-498f-a81e-7329c3065bdc.c4f14.json',
'http://pupupula.net/spring/res/import/3c/3c39b405-e296-4a59-a1ec-604d571e13ae.fdc77.json',
'http://pupupula.net/spring/res/import/38/38663287-370e-43e2-a594-11c1b6b89a49.e403f.json',
'http://pupupula.net/spring/res/import/19/192f45a4-ce4f-4237-af7d-716e19c68a3a.9ccc1.json',
'http://pupupula.net/spring/res/import/c8/c862143a-3f92-45ed-853a-4404fe95d197.3376e.json',
'http://pupupula.net/spring/res/import/ab/abb42230-b585-4d32-b576-847b69642a7e.ef20c.json',
'http://pupupula.net/spring/res/import/28/28286ccc-5074-46c1-b3e2-2527800047cf.8cb5f.json',
'http://pupupula.net/spring/res/import/6b/6b085e4d-a3a0-4e44-824b-1e0d1be6f469.af9e6.json',
'http://pupupula.net/spring/res/import/1d/1dc03d07-a893-4eaa-85a5-81cb991fa8b1.9dd36.json',
'http://pupupula.net/spring/res/import/e0/e03a0df2-8997-4e66-825e-4b795fb1655e.5419b.json',
'http://pupupula.net/spring/res/import/4b/4b5c7e8d-6600-439b-85ae-16616d8dd34f.f6145.json',
'http://pupupula.net/spring/res/import/77/779ac624-0b10-4c3e-9567-9a9c0899cf65.61811.json',
'http://pupupula.net/spring/res/import/b3/b30bdc9f-f7e7-4a67-b17d-b88af32cd6ca.06236.json',
'http://pupupula.net/spring/res/import/21/213dc26f-2205-4f18-8481-a19ef861c505.b9c98.json',
'http://pupupula.net/spring/res/import/d2/d2bdc3d2-fc00-4086-aa0d-554ca5587f6c.239be.json',
'http://pupupula.net/spring/res/import/b9/b90afad7-a084-445d-988f-a33d10cd70cd.43b6f.json',
'http://pupupula.net/spring/res/import/cd/cd1ff6af-20c7-485a-9204-d07f1c9516fe.261b9.json',
'http://pupupula.net/spring/res/import/be/be85ff7b-157c-448b-a214-3685592a8d30.59a22.json',
'http://pupupula.net/spring/res/import/75/7523af45-85be-49d0-aa74-f709c36f518b.e43f3.json',
'http://pupupula.net/spring/res/import/70/70ff8306-0547-485f-a2d5-6b17961bfb5a.5bc28.json',
'http://pupupula.net/spring/res/import/8d/8dc711d6-0c6f-4bc4-a46a-907d9a0e71bc.73f7d.json',
'http://pupupula.net/spring/res/import/73/73690d1f-ccdc-4016-9879-09d7c6a66d4f.f0a88.json',
'http://pupupula.net/spring/res/import/1c/1cd63829-103b-4d41-b1a0-97326fe085e9.4b32b.json',
'http://pupupula.net/spring/res/import/f4/f4aac316-51ac-4fad-aacf-707fba1156d7.ce934.json',
'http://pupupula.net/spring/res/import/d2/d262b458-c16f-4973-9a13-8293f9a26e72.fdab5.json',
'http://pupupula.net/spring/res/import/b5/b505988f-2701-4835-b6e6-7e6ab89dff4c.77633.json',
'http://pupupula.net/spring/res/import/40/40b1929b-46c7-4918-abf3-3b22c61ed5a5.0038c.json',
'http://pupupula.net/spring/res/import/64/646f9fc0-531f-4363-9ade-ed012844e279.90a80.json',
'http://pupupula.net/spring/res/import/ac/accdc6b7-d25f-428a-8ff0-3a10adac54c6.00461.json',
'http://pupupula.net/spring/res/import/14/14163ad6-b7f7-43aa-99aa-6f43f0b26c46.8f299.json',
'http://pupupula.net/spring/res/import/ad/ad8bb594-5e18-498f-a47c-15035177df8c.8640e.json',
'http://pupupula.net/spring/res/import/aa/aa08a7d1-4f28-4ef0-bfce-a01336524645.2cde7.json',
'http://pupupula.net/spring/res/import/16/1602761d-c166-459c-90d7-a87ba3966286.34f7f.json',
'http://pupupula.net/spring/res/import/15/151dbba7-4167-4795-afde-894ca01c90ad.45fe6.json',
'http://pupupula.net/spring/res/import/03/03f2dbdc-cc7f-4426-80ce-e55aa1ff7752.35235.json',
'http://pupupula.net/spring/res/import/52/520a808a-be29-410a-b6a3-2155abf66ef7.f32f9.json',
'http://pupupula.net/spring/res/import/cf/cfe1a371-00fa-4831-a9e1-d8169f57e168.864a2.json',
'http://pupupula.net/spring/res/import/85/85d83418-5c8c-4c20-aa29-6b8f452cc22c.40a8f.json',
'http://pupupula.net/spring/res/import/22/22c74207-8753-4ece-ad6d-59779cbe0cb5.0ad8f.json',
'http://pupupula.net/spring/res/import/36/36920c53-3879-42a3-9e33-e6c8f19e4b5e.4fa18.json',
'http://pupupula.net/spring/res/import/3b/3b352e5b-6727-4261-9516-d2dff3638c8a.3172d.json',
'http://pupupula.net/spring/res/import/cd/cdb256d0-01e1-48ff-9eee-6b84f19a1dfb.eb8a4.json',
'http://pupupula.net/spring/res/import/14/147231a4-5452-4a7b-a4cc-3b4f5bf58709.54e87.json',
'http://pupupula.net/spring/res/import/96/96fb158b-a29c-424a-a5ab-33da02ebae3f.8a5a8.json',
'http://pupupula.net/spring/res/import/d4/d463c7d9-af3d-4260-a98d-447b7c02dc78.6581b.json',
'http://pupupula.net/spring/res/import/c9/c95f67cd-a2a6-4752-a22a-2edd1e2fcb95.9063e.json',
'http://pupupula.net/spring/res/import/03/03bc470f-5bb7-447b-89af-999279a96ef3.3eaa0.json',
'http://pupupula.net/spring/res/import/21/215c6820-52d0-4e7b-9cb9-957d11651400.b4c36.json',
'http://pupupula.net/spring/res/import/71/71a7a312-aff5-41e4-bcb9-e289cbe83af2.81948.json',
'http://pupupula.net/spring/res/import/7f/7f060a7c-e0ff-4146-9308-6f7b9ca6e102.ab730.json',
'http://pupupula.net/spring/res/import/bf/bfbeaf68-14bf-4cdc-ab41-862df8751173.32954.json',
'http://pupupula.net/spring/res/import/f7/f7197c9a-dd50-4086-b40f-45f39f822972.0ff7a.json',
'http://pupupula.net/spring/res/import/1c/1c62b79a-64bb-4168-aed5-89a8d757f393.dd449.json',
'http://pupupula.net/spring/res/import/d4/d4338c71-c8f9-42cb-b41d-5d2a7f367d9f.1f950.json',
'http://pupupula.net/spring/res/import/37/37170e94-cfb1-4b69-85a2-00e8fac96368.c9606.json',
'http://pupupula.net/spring/res/import/38/38ba2848-c690-41f1-afcc-0820c00b966e.c5b6d.json',
'http://pupupula.net/spring/res/import/91/910d5a6e-c3e3-4732-802a-f8b4bf34d8f1.aa636.json',
'http://pupupula.net/spring/res/import/e4/e4554c5e-0710-4e3d-9642-c8b23cd4c0af.e6000.json',
'http://pupupula.net/spring/res/import/29/29544c9c-b854-4c61-b08d-d1e08f2a3863.7d006.json',
'http://pupupula.net/spring/res/import/e5/e596fba7-ddd9-46d5-9871-a023991607eb.575f5.json',
'http://pupupula.net/spring/res/import/d3/d3034afe-259d-49b9-934f-57129bd10b12.2b47a.json',
'http://pupupula.net/spring/res/import/4c/4c5191c1-3e2e-4b41-86ca-35c01053bd1e.3eb2c.json',
'http://pupupula.net/spring/res/import/a1/a1ff6337-0966-4787-8b6e-9dbcd24708e4.288bd.json',
'http://pupupula.net/spring/res/import/b1/b1829de9-4d15-4774-943d-881eb1c5406d.9dfd1.json',
'http://pupupula.net/spring/res/import/a7/a7fcf2c7-cb0b-4d07-89b7-1c688767984c.1e116.json',
'http://pupupula.net/spring/res/import/35/35da21c6-4d15-49c2-88e5-df6f1c44a6fd.5ae6e.json',
'http://pupupula.net/spring/res/import/7e/7e2e4662-e9ca-4f72-9bd1-1fe59d8a9f83.8d0e0.json',
'http://pupupula.net/spring/res/import/d1/d100bfcc-8ac8-456d-96a3-e20da72eb069.1f65f.json',
'http://pupupula.net/spring/res/import/3e/3e37dbb5-1c94-4779-acf0-e0a9d438a3f9.60a5a.json',
'http://pupupula.net/spring/res/import/87/87156dde-ce55-4f3e-8613-a42c3d824f07.4af59.json',
'http://pupupula.net/spring/res/import/b0/b038b510-0c66-4053-8dfe-ee0b905e5ef9.6b7dd.json',
'http://pupupula.net/spring/res/import/71/717b361b-3ea9-4688-a115-67fed5f8e915.6c43b.json',
'http://pupupula.net/spring/res/import/dd/dd3d96dd-ae14-4e9a-9b81-364e8b50b229.3fc2c.json',
'http://pupupula.net/spring/res/import/2a/2ac2bb70-141a-4d3f-bb69-1064c94b13c7.85d1c.json',
'http://pupupula.net/spring/res/import/35/356122d9-9efa-4347-9631-3ac0d81fadfe.d06c9.json',
'http://pupupula.net/spring/res/import/ab/ab232457-d6c9-430c-a14a-c3acd5c243d1.39b51.json',
'http://pupupula.net/spring/res/import/de/ded220ee-d62f-4a19-a43f-87d446fc1be6.7dd54.json',
'http://pupupula.net/spring/res/import/4b/4b38457c-e45f-4db3-9feb-40d812c57200.69144.json',
'http://pupupula.net/spring/res/import/54/542a696e-ca91-4c7b-a84e-391388c2e343.41912.json',
'http://pupupula.net/spring/res/import/71/716d526c-182e-4216-8da1-4a85e6b12b61.25788.json',
'http://pupupula.net/spring/res/import/b4/b4d817b7-2bf2-4cad-a5d5-53a9cf9d3c66.3b7f9.json',
'http://pupupula.net/spring/res/import/f3/f332ce8b-36d0-4ffa-baaa-7f43f2677e40.07377.json',
'http://pupupula.net/spring/res/import/25/25682e0b-2b07-4038-8048-89a57f5e67fa.9afff.json',
'http://pupupula.net/spring/res/import/7e/7e576c7b-daf0-4a58-951d-40e305cd02c0.9ffb2.json',
'http://pupupula.net/spring/res/import/55/5520bffb-ff7f-424e-9344-901a44af524e.1499e.json',
'http://pupupula.net/spring/res/import/96/96fe2784-6e3a-4a47-9db6-d2dc11a29b38.639b8.json',
'http://pupupula.net/spring/res/import/03/036d56f4-8fae-430c-94fe-3cade61e2d28.76fa9.json',
'http://pupupula.net/spring/res/import/2d/2d92e70a-3d62-4e17-8add-686bad7766c8.01b74.json',
'http://pupupula.net/spring/res/import/ee/eea3533b-6f16-45c2-8cf1-915304f78faa.0c201.json',
'http://pupupula.net/spring/res/import/10/10599247-8af2-459e-bd91-f476418cd878.0d6f7.json',
'http://pupupula.net/spring/res/import/3a/3a3f616a-94e4-4558-9869-4b3c370d300b.1064f.json',
'http://pupupula.net/spring/res/import/4c/4cdc8490-6e13-4b8f-b6c7-6f7541312f65.1c8c0.json',
'http://pupupula.net/spring/res/import/dd/dd89ba07-db2f-4c2f-9e47-142f70109308.87e81.json',
'http://pupupula.net/spring/res/import/da/da169c38-5670-4018-802e-70043e0699c2.4859e.json',
'http://pupupula.net/spring/res/import/a2/a245dc16-a575-42a9-b7ca-bcd27cde5fb4.2b080.json',
'http://pupupula.net/spring/res/import/66/66b70c17-bf1d-4158-8c4d-d44045675ea6.c6421.json',
'http://pupupula.net/spring/res/import/33/330362d4-9d8d-462f-a4ed-5f8ad7066128.8b041.json',
'http://pupupula.net/spring/res/import/c9/c9b4fddd-7b38-41ee-a018-b196bca7b150.c8427.json',
'http://pupupula.net/spring/res/import/72/7216a686-511b-4455-8f4d-e9b4618ab8f3.d6283.json',
'http://pupupula.net/spring/res/import/13/138791ca-2731-4e6e-8e0e-e124f4417c4a.13ee2.json',
'http://pupupula.net/spring/res/import/8c/8cfbd402-837a-4116-a7eb-22a4795a1443.3d15b.json',
'http://pupupula.net/spring/res/import/89/89d6f2b6-78e5-457d-bba3-c9448c94c34f.ced6d.json',
'http://pupupula.net/spring/res/import/84/84a8a294-d343-4877-9e6c-f829cec65c46.326be.json',
'http://pupupula.net/spring/res/import/26/263156ce-6250-4ba4-8952-539e34a56561.1e60b.json',
'http://pupupula.net/spring/res/import/35/35bf73f9-66b9-4780-b9c6-f2f27b8b4505.22922.json',
'http://pupupula.net/spring/res/import/a8/a8bf0622-4c59-46c9-8bca-203e9702d463.0ede3.json',
'http://pupupula.net/spring/res/import/92/92fb3139-f40a-4662-ad6c-295923d7a6e5.6cc40.json',
'http://pupupula.net/spring/res/import/8e/8ef764a2-3d64-4c63-8237-d21c34611ff3.63a98.json',
'http://pupupula.net/spring/res/import/71/7190fc06-48b3-4283-97a8-8222a68e2975.66193.json',
'http://pupupula.net/spring/res/import/a4/a4a80841-db50-42b3-8dd5-0ef536079921.7a498.json',
'http://pupupula.net/spring/res/import/d2/d266b281-898f-4e3d-8da3-933e8a3da863.cd728.json',
'http://pupupula.net/spring/res/import/6d/6d6dad7e-f37a-47d5-9d2f-a2cb100fd899.af963.json',
'http://pupupula.net/spring/res/import/4c/4c36c315-e1c9-4765-b212-23965d581bef.48fa0.json',
'http://pupupula.net/spring/res/import/d7/d7674f84-bb4d-44c7-b811-391eb249dfc0.f861e.json',
'http://pupupula.net/spring/res/import/56/56704bbd-3b58-4a43-a7c9-2c9c699bd264.17569.json',
'http://pupupula.net/spring/res/import/4a/4a4f8556-ecc9-48cf-a5d8-801186ae3527.1f5e8.json',
'http://pupupula.net/spring/res/import/f1/f13b48af-4c2c-4ac2-9117-d70548fe00d4.be6b2.json',
'http://pupupula.net/spring/res/import/74/7411678e-e4ed-4632-be81-99218fe4c5b1.1c195.json',
'http://pupupula.net/spring/res/import/d5/d5779fc3-7e65-4716-9742-57725911c770.e8073.json',
'http://pupupula.net/spring/res/import/2d/2d5adde3-7dcc-4374-9dc3-4e6da173fb9a.82e4f.json',
'http://pupupula.net/spring/res/import/dd/dde55cfc-e479-4901-b64f-72d9f1c98940.10529.json',
'http://pupupula.net/spring/res/import/78/78e1df94-74ba-4f7d-897b-c8b8731e3b62.ec3fe.json',
'http://pupupula.net/spring/res/import/e6/e65cd922-9d65-4428-aa5f-e67a9eb25617.ca96c.json',
'http://pupupula.net/spring/res/import/d3/d3a4120b-baec-4e72-b23e-0a5434551dfa.7685e.json',
'http://pupupula.net/spring/res/import/71/715f15b9-2513-4cba-8d24-25e5c19cface.2cb2f.json',
'http://pupupula.net/spring/res/import/f5/f576d5cc-ff07-4442-9256-ebe7c14e00b9.c4f45.json',
'http://pupupula.net/spring/res/import/77/77783029-2d74-4ef3-9b94-379d3e7bfdb6.619bf.json',
'http://pupupula.net/spring/res/import/a6/a6b9999b-202d-4e98-b6a6-ceb923c15cbc.e18fa.json',
'http://pupupula.net/spring/res/import/a8/a842f95a-774a-40fb-ad93-9313fc7b32cd.258db.json',
'http://pupupula.net/spring/res/import/a4/a4a634fb-ebda-400a-9354-6400448072b9.1b5d1.json',
'http://pupupula.net/spring/res/import/cf/cf8843f2-6c8a-4478-8342-65a2a978f3b9.4b964.json',
'http://pupupula.net/spring/res/import/e6/e682cb3c-410f-4523-bdd5-3c9988801b7c.25fb3.json',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/04.a8d3c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/02.73c41.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/06.e8cab.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/08.76c18.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/09.b98c5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/11.3ae48.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/10.fff18.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/12.1cd41.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/13.d3500.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/b02.8e3ad.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/01.3df41.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/01.fc78d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/02.9ffd3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/03.1d2cc.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/05.a8f17.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/04.45601.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/07.6397f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/08.6e852.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/09.0060f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/07.92928.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/10.10be3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/12.3582a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/11.baa15.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/15.27961.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/16.84903.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/05.930b3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/13.72ca7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/14.64149.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/17.4afb4.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/20.ff957.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/21.bdd7d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/23.fae47.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/24.e93c2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/19.34e6f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/22.6b3ce.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/26.d36c3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/25.df0a6.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/28.51cb2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/30.6975c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/29.6ca99.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/01.d19bf.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/31.a11ee.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/02.4ab5a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/03.9cca5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/05.dec1b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/04.4745a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/07.366ec.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/09.1339d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/08.5826e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/11.f60b2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/10.aba35.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/12.a2705.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/13.deba6.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/14.a8db0.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/27.07320.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/15.743e5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/01.aada2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Cat/16.159bc.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Dog/18.6f3e3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/05.3e66a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/03.398c7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/06.42aa5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/07.468d3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/08.eafe9.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/10.b0f37.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/09.b1282.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/11.9e44b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/12.48051.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/02.98bdf.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/14.ad69a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/13.60cfa.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/16.940fd.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/17.ca8d0.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/18.1bf2b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/20.d94b5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/21.a8554.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/19.2efed.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/22.b44a0.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/24.1ef14.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/23.385b1.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/15.ba2f1.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a01.209ee.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a02.350ea.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a03.4376a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a04.86c41.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a05.60d63.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/hair/a06.f0c3f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/04.3b5ad.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/05.f6b7c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/06.5a11a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/08.6f714.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/09.3eff6.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/face/10.2977e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/02.cc416.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/01.64242.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/03.55e6b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/04.4309c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/05.240a6.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/06.a0c6d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/08.54e4d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/12.f1d8f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/10.9da8b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/02.558a5.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/13.a9f22.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/03.25660.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/07.bec44.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/04.1796b.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/05.990a4.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/14.0b28d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_low/06.6faf7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/02.07645.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Female/body_up/09.42057.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/04.70b2a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/03.36b5c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/05.8c2bb.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/06.e2cb2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/08.abccb.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/09.5c7bc.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/10.9389f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/07.28988.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/11.d6565.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/13.d2092.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/12.71ef3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/14.7ca56.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/15.e9bf4.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/16.c36d9.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/19.78d16.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/18.0fef7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/20.5c3b3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/21.802f2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/22.ef483.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a02.350ea.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a01.209ee.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a03.4376a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a06.f0c3f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/17.bfc57.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/03.75dba.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/02.4a418.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/06.dd1d3.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/07.f507d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/08.8553c.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/09.a9ead.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/10.be27d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/12.8cf6f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/04.7fd60.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a05.60d63.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/05.c69a7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/13.5168e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/07.4b4a7.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/beard/11.be858.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/04.3b5ad.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/06.5a11a.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/08.f332e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/10.2977e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/01.86636.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/02.43434.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/05.f6c82.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/04.b4a83.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/09.50a3e.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/06.85842.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/hair/a04.86c41.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/03.3cf57.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/07.2c3ce.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/08.d25e8.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/11.42585.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/10.2446d.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/14.dea25.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/15.982df.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/02.81f51.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/05.49e9f.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/04.823dd.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/03.ba5c2.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/13.b4631.png',
'http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/09.ac1e4.png'
    ];

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

deleteall('./pupupula.net');
urls.forEach(function (url) {

    var dir = url.substring('http://'.length, url.lastIndexOf('/')+1);
    var file = url.substring(url.lastIndexOf('/')+1);
    var fulldir =  url.substring('http://'.length);
    // console.log('=========??????????????????' + dir + '===========');
    mkdirsSync(dir);
    // console.log('=========??????????????????' + dir + '===========');
    // console.log('=========??????????????????????????????' + fulldir + '===========');
    try {
        request(url).pipe(fs.createWriteStream('./' + url.substring('http://'.length)));
    } catch (ex){
        console.log(ex);
    }
    // console.log('=========??????????????????????????????' + fulldir + '===========');
});
console.log('end')
