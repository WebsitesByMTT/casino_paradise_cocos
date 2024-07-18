
(function () {
var scripts = [{"deps":{"./assets/Scripts/ServerCom":2,"./assets/Scripts/Config/ResponseType":7,"./assets/Scripts/Config/GameConfig":8,"./assets/Scripts/EditBox":5,"./assets/Scripts/Lobby/Lobby":3,"./assets/Scripts/PrefabScript/IframeScript":1,"./assets/Scripts/login/Login":4,"./assets/Scripts/GamesPrefab":6},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/PrefabScript/IframeScript.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/ServerCom.js"},{"deps":{"Login":4,"jsonwebtoken":9},"path":"preview-scripts/assets/Scripts/Lobby/Lobby.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/login/Login.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/EditBox.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/GamesPrefab.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/Config/ResponseType.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/Config/GameConfig.js"},{"deps":{"./lib/JsonWebTokenError":13,"./lib/TokenExpiredError":11,"./lib/NotBeforeError":10,"./decode":12,"./sign":15,"./verify":14},"path":"preview-scripts/__node_modules/jsonwebtoken/index.js"},{"deps":{"./JsonWebTokenError":13},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/NotBeforeError.js"},{"deps":{"./JsonWebTokenError":13},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/TokenExpiredError.js"},{"deps":{"jws":81},"path":"preview-scripts/__node_modules/jsonwebtoken/decode.js"},{"deps":{},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/JsonWebTokenError.js"},{"deps":{"crypto":16,"buffer":17,"./lib/JsonWebTokenError":13,"./lib/NotBeforeError":10,"./lib/TokenExpiredError":11,"./decode":12,"./lib/timespan":19,"./lib/validateAsymmetricKey":18,"./lib/psSupported":20,"jws":81},"path":"preview-scripts/__node_modules/jsonwebtoken/verify.js"},{"deps":{"./lib/timespan":19,"./lib/psSupported":20,"./lib/validateAsymmetricKey":18,"buffer":17,"jws":81,"lodash.includes":88,"lodash.isboolean":96,"lodash.isplainobject":92,"lodash.once":93,"lodash.isstring":94,"lodash.isnumber":89,"lodash.isinteger":91,"crypto":16},"path":"preview-scripts/__node_modules/jsonwebtoken/sign.js"},{"deps":{"randomfill":25,"randombytes":21,"pbkdf2":29,"create-hash":22,"diffie-hellman":23,"browserify-sign/algos":49,"create-ecdh":28,"create-hmac":24,"browserify-cipher":48,"public-encrypt":30,"browserify-sign":50},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"isarray":31,"ieee754":26},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"./asymmetricKeyDetailsSupported":67,"./rsaPssKeyDetailsSupported":68},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"},{"deps":{"ms":212},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/timespan.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":34,"semver":211},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/psSupported.js"},{"deps":{"../process/browser.js":34,"safe-buffer":39},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":41,"ripemd160":47,"sha.js":46,"cipher-base":40,"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"./lib/primes.json":35,"buffer":17,"./lib/generatePrime":32,"./lib/dh":36},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"inherits":41,"./legacy":37,"safe-buffer":39,"create-hash/md5":44,"sha.js":46,"cipher-base":40,"ripemd160":47},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"../process/browser.js":34,"randombytes":21,"safe-buffer":39},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{"buffer":17,"bn.js":52,"elliptic":51},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"./lib/sync":38,"./lib/async":33},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"./publicEncrypt":42,"./privateDecrypt":43},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"randombytes":21,"bn.js":78,"miller-rabin":71},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"./precondition":53,"./sync":38,"safe-buffer":39,"./default-encoding":54,"./to-buffer":55},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./generatePrime":32,"buffer":17,"randombytes":21,"bn.js":78,"miller-rabin":71},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"inherits":41,"safe-buffer":39,"cipher-base":40},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"./precondition":53,"./default-encoding":54,"./to-buffer":55,"create-hash/md5":44,"ripemd160":47,"sha.js":46,"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"safe-buffer":39,"inherits":41,"string_decoder":56,"stream":57},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"./xor":60,"randombytes":21,"create-hash":22,"safe-buffer":39,"parse-asn1":69,"./mgf":58,"bn.js":83,"./withPublic":59,"browserify-rsa":114},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":58,"./xor":60,"./withPublic":59,"create-hash":22,"safe-buffer":39,"bn.js":83,"browserify-rsa":114,"parse-asn1":69},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"inherits":41,"safe-buffer":39,"hash-base":70},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"./sha1":62,"./sha224":63,"./sha256":66,"./sha384":64,"./sha512":65,"./sha":61},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"buffer":17,"inherits":41,"hash-base":70},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"evp_bytestokey":82,"browserify-aes/browser":122,"browserify-des/modes":121,"browserify-des":125,"browserify-aes/modes":132},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"./browser/algorithms.json":84},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"./algorithms.json":84,"create-hash":22,"inherits":41,"./verify":85,"safe-buffer":127,"./sign":86,"readable-stream":133},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":76,"brorand":80,"./elliptic/utils":72,"./elliptic/curve":73,"./elliptic/curves":77,"./elliptic/ec":74,"./elliptic/eddsa":75},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":34},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/to-buffer.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"events":87,"inherits":41,"readable-stream/transform.js":111,"readable-stream/passthrough.js":109,"readable-stream/writable.js":95,"readable-stream/duplex.js":106,"readable-stream/readable.js":108},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"create-hash":22,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"bn.js":83,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"inherits":41,"safe-buffer":39,"./hash":90},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./hash":90,"inherits":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./sha256":66,"./hash":90,"inherits":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./sha512":65,"./hash":90,"inherits":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":90,"inherits":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"./hash":90,"inherits":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":34,"semver":211},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":34,"semver":211},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"},{"deps":{"./aesid.json":99,"pbkdf2":29,"safe-buffer":39,"browserify-aes":122,"./asn1":97,"./fixProc":98},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":41,"safe-buffer":115,"readable-stream":119},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"brorand":80,"bn.js":120},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"bn.js":123,"minimalistic-assert":113,"minimalistic-crypto-utils":116},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":100,"./short":104,"./mont":102,"./edwards":101},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../utils":72,"../curves":77,"brorand":80,"./key":103,"./signature":107,"bn.js":123,"hmac-drbg":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"../curves":77,"../utils":72,"./key":105,"./signature":110,"hash.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":73,"./utils":72,"./precomputed/secp256k1":112,"hash.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"crypto":79},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"./lib/sign-stream":152,"./lib/verify-stream":148},"path":"preview-scripts/__node_modules/jws/index.js"},{"deps":{"safe-buffer":39,"md5.js":45},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{"./curves.json":145,"elliptic":51,"parse-asn1":69,"bn.js":146,"safe-buffer":127},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"./curves.json":145,"create-hmac":24,"elliptic":51,"parse-asn1":69,"bn.js":146,"browserify-rsa":114,"safe-buffer":127},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.includes/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isnumber/index.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isinteger/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isplainobject/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.once/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isstring/index.js"},{"deps":{"./lib/_stream_writable.js":124},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isboolean/index.js"},{"deps":{"./certificate":126,"asn1.js":136},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{"safe-buffer":39,"evp_bytestokey":82,"browserify-aes":122},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"../utils":72,"bn.js":123},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"../utils":72,"./base":100,"bn.js":123,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"./base":100,"../utils":72,"bn.js":123,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":72,"bn.js":123},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":72,"./base":100,"bn.js":123,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":72},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"./lib/_stream_duplex.js":128},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"../utils":72,"bn.js":123},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{"./lib/_stream_writable.js":124,"./lib/_stream_duplex.js":128,"./lib/_stream_transform.js":130,"./lib/_stream_passthrough.js":131,"./lib/_stream_readable.js":129},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"./readable":108},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"../utils":72,"bn.js":123},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"./readable":108},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"buffer":17,"randombytes":21,"bn.js":146},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"hash.js":118,"minimalistic-crypto-utils":116,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./hash/ripemd":140,"./hash/utils":134,"./hash/common":137,"./hash/hmac":139,"./hash/sha":138},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"./lib/internal/streams/end-of-stream.js":147,"./lib/internal/streams/pipeline.js":153,"./lib/_stream_duplex.js":141,"./lib/_stream_transform.js":143,"./lib/_stream_passthrough.js":144,"./lib/_stream_writable.js":142,"./lib/_stream_readable.js":135},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./modes/list.json":176,"./decrypter":177,"./encrypter":175},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_duplex":128,"../../process/browser.js":34,"inherits":41,"./internal/streams/stream":154,"safe-buffer":39,"process-nextick-args":150,"core-util-is":156,"util-deprecate":151,"./internal/streams/destroy":155},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"cipher-base":40,"inherits":41,"safe-buffer":39,"des.js":179},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"asn1.js":136},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"},{"deps":{"./_stream_readable":129,"./_stream_writable":124,"inherits":41,"process-nextick-args":150,"core-util-is":156},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"events":87,"./internal/streams/stream":154,"util":79,"./internal/streams/destroy":155,"./_stream_duplex":128,"../../process/browser.js":34,"safe-buffer":39,"inherits":41,"process-nextick-args":150,"core-util-is":156,"isarray":174,"./internal/streams/BufferList":149,"string_decoder/":178},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_duplex":128,"inherits":41,"core-util-is":156},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":130,"inherits":41,"core-util-is":156},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./ecb":182,"./list.json":176,"./cfb8":186,"./cfb1":185,"./cfb":183,"./ofb":184,"./ctr":187,"./cbc":181},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"./lib/internal/streams/end-of-stream.js":194,"./lib/internal/streams/pipeline.js":205,"./lib/_stream_transform.js":192,"./lib/_stream_duplex.js":189,"./lib/_stream_passthrough.js":191,"./lib/_stream_writable.js":180,"./lib/_stream_readable.js":190},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"minimalistic-assert":113,"inherits":41},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"events":87,"buffer":17,"util":79,"../errors":165,"./_stream_duplex":141,"./internal/streams/from":169,"../../../../process/browser.js":34,"./internal/streams/stream":163,"./internal/streams/buffer_list":167,"./internal/streams/destroy":166,"./internal/streams/state":164,"inherits":41,"./internal/streams/async_iterator":168,"string_decoder/":188},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./asn1/constants":160,"./asn1/api":157,"bn.js":193,"./asn1/encoders":158,"./asn1/base":161,"./asn1/decoders":159},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"./utils":134,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./sha/224":170,"./sha/384":172,"./sha/1":162,"./sha/256":171,"./sha/512":173},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":134,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./utils":134,"./common":137},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./_stream_readable":135,"./_stream_writable":142,"../../../../process/browser.js":34,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./internal/streams/stream":163,"buffer":17,"./internal/streams/destroy":166,"./internal/streams/state":164,"../errors":165,"./_stream_duplex":141,"../../../../process/browser.js":34,"inherits":41,"util-deprecate":151},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"../errors":165,"./_stream_duplex":141,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":143,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":165},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"stream":57,"util":204,"./tostring":215,"safe-buffer":277,"./data-stream":214,"jwa":276},"path":"preview-scripts/__node_modules/jws/lib/verify-stream.js"},{"deps":{"util":79,"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"../process/browser.js":34},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"stream":57,"./data-stream":214,"./tostring":215,"util":204,"jwa":276,"safe-buffer":277},"path":"preview-scripts/__node_modules/jws/lib/sign-stream.js"},{"deps":{"../../../errors":165,"./end-of-stream":147},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"process-nextick-args":150},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"./encoders":158,"./decoders":159,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./pem":198,"./der":195},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"./der":199,"./pem":200},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./der":196},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./reporter":203,"./node":201,"./buffer":197},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"../utils":134,"../common":137,"./common":202},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":165},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":17,"util":79},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"./end-of-stream":147,"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"../utils":134,"./256":171},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":134,"../common":137,"./common":202,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":134,"./512":173},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":134,"../common":137,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./modes":132,"safe-buffer":39,"cipher-base":40,"evp_bytestokey":82,"inherits":41,"./aes":218,"./streamCipher":216,"./authCipher":217},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"./authCipher":217,"./modes":132,"./streamCipher":216,"./aes":218,"safe-buffer":39,"cipher-base":40,"evp_bytestokey":82,"inherits":41},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./des/utils":206,"./des/cipher":207,"./des/des":208,"./des/cbc":209,"./des/ede":210},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"./internal/streams/stream":225,"buffer":17,"./internal/streams/state":223,"./_stream_duplex":189,"../../../../process/browser.js":34,"../errors":226,"util-deprecate":151,"inherits":41,"./internal/streams/destroy":221},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"buffer-xor":220},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":39,"buffer-xor":220},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"buffer":17,"buffer-xor":220},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"../incr32":222,"safe-buffer":39,"buffer-xor":220},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"safe-buffer":115},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./_stream_readable":190,"./_stream_writable":180,"../../../../process/browser.js":34,"inherits":41},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"events":87,"buffer":17,"util":79,"../errors":226,"./_stream_duplex":189,"./internal/streams/from":229,"../../../../process/browser.js":34,"./internal/streams/destroy":221,"inherits":41,"./internal/streams/stream":225,"./internal/streams/state":223,"./internal/streams/async_iterator":228,"./internal/streams/buffer_list":227,"string_decoder/":272},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_transform":192,"inherits":41},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_duplex":189,"../errors":226,"inherits":41},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"buffer":79},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":226},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../base/node":201,"../constants/der":196,"inherits":41,"safer-buffer":219},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"../base/reporter":203,"inherits":41,"safer-buffer":219},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"./der":195,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"../base/buffer":197,"../base/node":201,"../constants/der":196,"inherits":41,"bn.js":193},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"./der":199,"inherits":41,"safer-buffer":219},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"../base/reporter":203,"../base/buffer":197,"minimalistic-assert":113},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"../utils":134},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"./support/isBuffer":213,"../process/browser.js":34,"inherits":224},"path":"preview-scripts/__node_modules/util/util.js"},{"deps":{"../../../errors":226,"./end-of-stream":194},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"minimalistic-assert":113},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./utils":206,"./cipher":207,"minimalistic-assert":113,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":113,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./cipher":207,"./des":208,"minimalistic-assert":113,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"./internal/identifiers":235,"./internal/constants":231,"./functions/diff":237,"./ranges/simplify":268,"./ranges/subset":270,"./classes/semver":263,"./functions/valid":232,"./functions/clean":259,"./functions/inc":236,"./functions/major":248,"./functions/minor":265,"./functions/patch":257,"./functions/prerelease":251,"./functions/compare":241,"./functions/rcompare":247,"./functions/compare-loose":244,"./functions/compare-build":252,"./functions/sort":240,"./functions/rsort":239,"./functions/gt":242,"./functions/lt":260,"./functions/eq":249,"./functions/neq":246,"./functions/gte":243,"./functions/lte":245,"./functions/cmp":255,"./functions/coerce":254,"./functions/satisfies":256,"./functions/parse":250,"./ranges/max-satisfying":262,"./ranges/min-satisfying":234,"./ranges/min-version":253,"./ranges/valid":261,"./ranges/outside":258,"./ranges/gtr":269,"./ranges/ltr":267,"./ranges/intersects":266,"./ranges/to-comparators":271,"./classes/comparator":233,"./classes/range":264,"./internal/re":238},"path":"preview-scripts/__node_modules/semver/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ms/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/support/isBufferBrowser.js"},{"deps":{"stream":57,"util":204,"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":34,"safe-buffer":277},"path":"preview-scripts/__node_modules/jws/lib/data-stream.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/jws/lib/tostring.js"},{"deps":{"./aes":218,"inherits":41,"safe-buffer":39,"cipher-base":40},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":218,"./incr32":222,"safe-buffer":39,"inherits":41,"cipher-base":40,"buffer-xor":220,"./ghash":230},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{"buffer":17,"../process/browser.js":34},"path":"preview-scripts/__node_modules/safer-buffer/safer.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"../../../errors":226},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/node_modules/inherits/inherits_browser.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"util":79,"buffer":17},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"./end-of-stream":194,"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/constants.js"},{"deps":{"./parse":250},"path":"preview-scripts/__node_modules/semver/functions/valid.js"},{"deps":{"../internal/re":238,"../functions/cmp":255,"../internal/debug":273,"./semver":263,"./range":264,"../internal/parse-options":274},"path":"preview-scripts/__node_modules/semver/classes/comparator.js"},{"deps":{"../classes/semver":263,"../classes/range":264},"path":"preview-scripts/__node_modules/semver/ranges/min-satisfying.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/identifiers.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/inc.js"},{"deps":{"./parse.js":250},"path":"preview-scripts/__node_modules/semver/functions/diff.js"},{"deps":{"./constants":231,"./debug":273},"path":"preview-scripts/__node_modules/semver/internal/re.js"},{"deps":{"./compare-build":252},"path":"preview-scripts/__node_modules/semver/functions/rsort.js"},{"deps":{"./compare-build":252},"path":"preview-scripts/__node_modules/semver/functions/sort.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/compare.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/gt.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/gte.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/compare-loose.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/lte.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/neq.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/rcompare.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/major.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/eq.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/parse.js"},{"deps":{"./parse":250},"path":"preview-scripts/__node_modules/semver/functions/prerelease.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/compare-build.js"},{"deps":{"../classes/semver":263,"../classes/range":264,"../functions/gt":242},"path":"preview-scripts/__node_modules/semver/ranges/min-version.js"},{"deps":{"../classes/semver":263,"./parse":250,"../internal/re":238},"path":"preview-scripts/__node_modules/semver/functions/coerce.js"},{"deps":{"./eq":249,"./neq":246,"./gt":242,"./gte":243,"./lt":260,"./lte":245},"path":"preview-scripts/__node_modules/semver/functions/cmp.js"},{"deps":{"../classes/range":264},"path":"preview-scripts/__node_modules/semver/functions/satisfies.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/patch.js"},{"deps":{"../classes/semver":263,"../classes/comparator":233,"../classes/range":264,"../functions/satisfies":256,"../functions/gt":242,"../functions/lt":260,"../functions/lte":245,"../functions/gte":243},"path":"preview-scripts/__node_modules/semver/ranges/outside.js"},{"deps":{"./parse":250},"path":"preview-scripts/__node_modules/semver/functions/clean.js"},{"deps":{"./compare":241},"path":"preview-scripts/__node_modules/semver/functions/lt.js"},{"deps":{"../classes/range":264},"path":"preview-scripts/__node_modules/semver/ranges/valid.js"},{"deps":{"../classes/semver":263,"../classes/range":264},"path":"preview-scripts/__node_modules/semver/ranges/max-satisfying.js"},{"deps":{"../internal/debug":273,"../internal/constants":231,"../internal/re":238,"../internal/parse-options":274,"../internal/identifiers":235},"path":"preview-scripts/__node_modules/semver/classes/semver.js"},{"deps":{"../internal/parse-options":274,"../internal/debug":273,"../internal/re":238,"../internal/lrucache":275,"../internal/constants":231,"./semver":263,"./comparator":233},"path":"preview-scripts/__node_modules/semver/classes/range.js"},{"deps":{"../classes/semver":263},"path":"preview-scripts/__node_modules/semver/functions/minor.js"},{"deps":{"../classes/range":264},"path":"preview-scripts/__node_modules/semver/ranges/intersects.js"},{"deps":{"./outside":258},"path":"preview-scripts/__node_modules/semver/ranges/ltr.js"},{"deps":{"../functions/satisfies.js":256,"../functions/compare.js":241},"path":"preview-scripts/__node_modules/semver/ranges/simplify.js"},{"deps":{"./outside":258},"path":"preview-scripts/__node_modules/semver/ranges/gtr.js"},{"deps":{"../classes/range.js":264,"../classes/comparator.js":233,"../functions/satisfies.js":256,"../functions/compare.js":241},"path":"preview-scripts/__node_modules/semver/ranges/subset.js"},{"deps":{"../classes/range":264},"path":"preview-scripts/__node_modules/semver/ranges/to-comparators.js"},{"deps":{"safe-buffer":127},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":34},"path":"preview-scripts/__node_modules/semver/internal/debug.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/parse-options.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/lrucache.js"},{"deps":{"crypto":16,"util":204,"safe-buffer":277,"buffer-equal-constant-time":278,"ecdsa-sig-formatter":279},"path":"preview-scripts/__node_modules/jwa/index.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"buffer":17},"path":"preview-scripts/__node_modules/buffer-equal-constant-time/index.js"},{"deps":{"./param-bytes-for-alg":280,"safe-buffer":277},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"},{"deps":{},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    