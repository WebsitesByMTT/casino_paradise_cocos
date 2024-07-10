
(function () {
var scripts = [{"deps":{"./assets/Scripts/GamesPrefab":2,"./assets/Scripts/Config/GameConfig":3,"./assets/Scripts/login/Login":5,"./assets/Scripts/ServerCom":1,"./assets/Scripts/Lobby/Lobby":4},"path":"preview-scripts/__qc_index__.js"},{"deps":{"js-cookies":6},"path":"preview-scripts/assets/Scripts/ServerCom.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/GamesPrefab.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/Config/GameConfig.js"},{"deps":{"Login":5,"js-cookies":6,"jsonwebtoken":7},"path":"preview-scripts/assets/Scripts/Lobby/Lobby.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/login/Login.js"},{"deps":{},"path":"preview-scripts/__node_modules/js-cookies/index.js"},{"deps":{"./lib/JsonWebTokenError":10,"./lib/NotBeforeError":8,"./lib/TokenExpiredError":9,"./verify":13,"./decode":11,"./sign":12},"path":"preview-scripts/__node_modules/jsonwebtoken/index.js"},{"deps":{"./JsonWebTokenError":10},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/NotBeforeError.js"},{"deps":{"./JsonWebTokenError":10},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/TokenExpiredError.js"},{"deps":{},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/JsonWebTokenError.js"},{"deps":{"jws":81},"path":"preview-scripts/__node_modules/jsonwebtoken/decode.js"},{"deps":{"buffer":15,"lodash.isnumber":88,"lodash.includes":89,"lodash.isinteger":90,"lodash.isboolean":91,"lodash.isplainobject":102,"lodash.once":103,"lodash.isstring":104,"./lib/timespan":16,"./lib/validateAsymmetricKey":18,"crypto":14,"./lib/psSupported":17,"jws":81},"path":"preview-scripts/__node_modules/jsonwebtoken/sign.js"},{"deps":{"crypto":14,"buffer":15,"./lib/JsonWebTokenError":10,"./lib/TokenExpiredError":9,"./lib/NotBeforeError":8,"./decode":11,"./lib/timespan":16,"./lib/validateAsymmetricKey":18,"./lib/psSupported":17,"jws":81},"path":"preview-scripts/__node_modules/jsonwebtoken/verify.js"},{"deps":{"randombytes":19,"randomfill":26,"create-hmac":20,"pbkdf2":21,"browserify-sign/algos":47,"diffie-hellman":25,"create-hash":22,"create-ecdh":23,"browserify-cipher":46,"public-encrypt":24,"browserify-sign":49},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"ieee754":27,"base64-js":28,"isarray":29},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"ms":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/timespan.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":210},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/psSupported.js"},{"deps":{"./asymmetricKeyDetailsSupported":67,"./rsaPssKeyDetailsSupported":71},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"},{"deps":{"../process/browser.js":32,"safe-buffer":39},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":42,"cipher-base":41,"ripemd160":43,"sha.js":44,"safe-buffer":39,"./legacy":33,"create-hash/md5":40},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"./lib/sync":34,"./lib/async":30},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"inherits":42,"ripemd160":43,"sha.js":44,"cipher-base":41,"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"buffer":15,"bn.js":50,"elliptic":48},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"./publicEncrypt":35,"./privateDecrypt":36},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{"buffer":15,"./lib/primes.json":37,"./lib/generatePrime":31,"./lib/dh":38},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"randombytes":19,"safe-buffer":39,"../process/browser.js":32},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"./sync":34,"safe-buffer":39,"./precondition":51,"./default-encoding":52,"./to-buffer":53},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"randombytes":19,"bn.js":78,"miller-rabin":73},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"inherits":42,"safe-buffer":39,"cipher-base":41},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"./precondition":51,"./default-encoding":52,"./to-buffer":53,"create-hash/md5":40,"ripemd160":43,"sha.js":44,"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{"randombytes":19,"create-hash":22,"safe-buffer":39,"parse-asn1":65,"bn.js":80,"./xor":55,"browserify-rsa":110,"./mgf":54,"./withPublic":56},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":54,"./xor":55,"./withPublic":56,"create-hash":22,"safe-buffer":39,"bn.js":80,"browserify-rsa":110,"parse-asn1":65},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./generatePrime":31,"buffer":15,"randombytes":19,"bn.js":78,"miller-rabin":73},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"safe-buffer":39,"inherits":42,"string_decoder":63,"stream":57},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"buffer":15,"inherits":42,"hash-base":66},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"./sha512":59,"./sha":60,"./sha256":61,"./sha384":62,"./sha1":64,"./sha224":58},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"inherits":42,"safe-buffer":39,"hash-base":66},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"browserify-aes/browser":120,"evp_bytestokey":79,"browserify-des/modes":124,"browserify-des":119,"browserify-aes/modes":129},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"./browser/algorithms.json":82},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"../package.json":74,"brorand":76,"./elliptic/curves":75,"./elliptic/curve":69,"./elliptic/utils":68,"./elliptic/ec":72,"./elliptic/eddsa":70},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"./algorithms.json":82,"create-hash":22,"inherits":42,"./sign":112,"./verify":111,"safe-buffer":142,"readable-stream":137},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":32},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/to-buffer.js"},{"deps":{"create-hash":22,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"bn.js":80,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{"inherits":42,"events":83,"readable-stream/transform.js":106,"readable-stream/passthrough.js":107,"readable-stream/duplex.js":105,"readable-stream/writable.js":92,"readable-stream/readable.js":108},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"./sha256":61,"inherits":42,"safe-buffer":39,"./hash":84},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":84,"inherits":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"./hash":84,"inherits":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./hash":84,"inherits":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./sha512":59,"./hash":84,"inherits":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"./hash":84,"inherits":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"pbkdf2":21,"safe-buffer":39,"./aesid.json":86,"./fixProc":87,"./asn1":85,"browserify-aes":120},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":42,"safe-buffer":113,"readable-stream":117},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":210},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"},{"deps":{"bn.js":118,"minimalistic-assert":109,"minimalistic-crypto-utils":114},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":93,"./short":94,"./edwards":98,"./mont":99},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../curves":75,"../utils":68,"./key":95,"./signature":97,"hash.js":115},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":210},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"},{"deps":{"../utils":68,"../curves":75,"brorand":76,"./key":100,"./signature":101,"hmac-drbg":116,"bn.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"brorand":76,"bn.js":122},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":69,"./utils":68,"hash.js":115,"./precomputed/secp256k1":96},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"crypto":77},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{"safe-buffer":39,"md5.js":45},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{"./lib/sign-stream":154,"./lib/verify-stream":160},"path":"preview-scripts/__node_modules/jws/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{"./certificate":123,"asn1.js":131},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"evp_bytestokey":79,"safe-buffer":39,"browserify-aes":120},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isnumber/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.includes/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isinteger/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isboolean/index.js"},{"deps":{"./lib/_stream_writable.js":121},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{"../utils":68,"bn.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"../utils":68,"./base":93,"bn.js":118,"inherits":42},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":68},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"../utils":68,"bn.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"../utils":68,"./base":93,"bn.js":118,"inherits":42},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"./base":93,"../utils":68,"bn.js":118,"inherits":42},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":68,"bn.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":68,"bn.js":118},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isplainobject/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.once/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isstring/index.js"},{"deps":{"./lib/_stream_duplex.js":125},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./readable":108},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"./readable":108},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./lib/_stream_writable.js":121,"./lib/_stream_duplex.js":125,"./lib/_stream_transform.js":127,"./lib/_stream_passthrough.js":128,"./lib/_stream_readable.js":126},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"buffer":15,"randombytes":19,"bn.js":148},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"elliptic":48,"parse-asn1":65,"safe-buffer":142,"./curves.json":149,"bn.js":148},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"./curves.json":149,"create-hmac":20,"elliptic":48,"parse-asn1":65,"bn.js":148,"safe-buffer":142,"browserify-rsa":110},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"./hash/utils":130,"./hash/ripemd":136,"./hash/common":133,"./hash/hmac":135,"./hash/sha":134},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"hash.js":115,"minimalistic-crypto-utils":114,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./lib/_stream_writable.js":138,"./lib/_stream_passthrough.js":139,"./lib/_stream_duplex.js":140,"./lib/_stream_transform.js":141,"./lib/internal/streams/end-of-stream.js":143,"./lib/internal/streams/pipeline.js":144,"./lib/_stream_readable.js":132},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"cipher-base":41,"inherits":42,"safe-buffer":39,"des.js":173},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"./modes/list.json":176,"./decrypter":175,"./encrypter":174},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"./_stream_duplex":125,"../../process/browser.js":32,"inherits":42,"safe-buffer":39,"util-deprecate":146,"process-nextick-args":145,"./internal/streams/stream":147,"core-util-is":158,"./internal/streams/destroy":157},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"asn1.js":131},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./_stream_readable":126,"./_stream_writable":121,"process-nextick-args":145,"core-util-is":158,"inherits":42},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"events":83,"./internal/streams/stream":147,"util":77,"./internal/streams/destroy":157,"./_stream_duplex":125,"../../process/browser.js":32,"process-nextick-args":145,"safe-buffer":39,"core-util-is":158,"inherits":42,"./internal/streams/BufferList":150,"isarray":172,"string_decoder/":177},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_duplex":125,"core-util-is":158,"inherits":42},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":127,"core-util-is":158,"inherits":42},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./list.json":176,"./ecb":180,"./cfb8":182,"./cfb1":184,"./ofb":185,"./cfb":181,"./cbc":183,"./ctr":186},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"minimalistic-assert":109,"inherits":42},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"./asn1/api":153,"./asn1/constants":151,"bn.js":179,"./asn1/base":156,"./asn1/encoders":155,"./asn1/decoders":152},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"events":83,"buffer":15,"util":77,"./_stream_duplex":140,"../../../../process/browser.js":32,"inherits":42,"../errors":164,"./internal/streams/from":166,"./internal/streams/stream":161,"./internal/streams/buffer_list":162,"./internal/streams/destroy":163,"./internal/streams/state":165,"./internal/streams/async_iterator":167,"string_decoder/":178},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./utils":130,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./sha/224":168,"./sha/384":171,"./sha/256":169,"./sha/512":170,"./sha/1":159},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":130,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./utils":130,"./common":133},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./lib/_stream_duplex.js":197,"./lib/_stream_passthrough.js":198,"./lib/_stream_transform.js":199,"./lib/internal/streams/end-of-stream.js":202,"./lib/internal/streams/pipeline.js":208,"./lib/_stream_writable.js":195,"./lib/_stream_readable.js":200},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"./internal/streams/stream":161,"buffer":15,"./internal/streams/destroy":163,"./internal/streams/state":165,"../errors":164,"./_stream_duplex":140,"../../../../process/browser.js":32,"util-deprecate":146,"inherits":42},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./_stream_transform":141,"inherits":42},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_readable":132,"./_stream_writable":138,"../../../../process/browser.js":32,"inherits":42},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"../errors":164,"./_stream_duplex":140,"inherits":42},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"},{"deps":{"../../../errors":164},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../../../errors":164,"./end-of-stream":143},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"../process/browser.js":32},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"util":77,"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"./der":187},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./der":188,"./pem":191},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./encoders":155,"./decoders":152,"inherits":42},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"stream":57,"util":207,"./tostring":218,"jwa":274,"safe-buffer":275,"./data-stream":217},"path":"preview-scripts/__node_modules/jws/lib/sign-stream.js"},{"deps":{"./pem":190,"./der":189},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"./reporter":192,"./node":194,"./buffer":193},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"process-nextick-args":145},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"../utils":130,"../common":133,"./common":196},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"stream":57,"util":207,"./data-stream":217,"./tostring":218,"safe-buffer":275,"jwa":274},"path":"preview-scripts/__node_modules/jws/lib/verify-stream.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"buffer":15,"util":77},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../errors":164},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"./end-of-stream":143,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"../utils":130,"./256":169},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":130,"../common":133,"./common":196,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":130,"../common":133,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"../utils":130,"./512":170},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./des/utils":201,"./des/cipher":203,"./des/des":204,"./des/cbc":205,"./des/ede":206},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"./modes":129,"safe-buffer":39,"cipher-base":41,"evp_bytestokey":79,"inherits":42,"./streamCipher":213,"./aes":214,"./authCipher":212},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{"./authCipher":212,"./modes":129,"./streamCipher":213,"./aes":214,"safe-buffer":39,"cipher-base":41,"evp_bytestokey":79,"inherits":42},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"safe-buffer":113},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":39,"buffer-xor":216},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"buffer-xor":216},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"buffer":15,"buffer-xor":216},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":39,"buffer-xor":216,"../incr32":219},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"../base/buffer":193,"../base/node":194,"../constants/der":187,"inherits":42,"bn.js":179},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"../base/node":194,"../constants/der":187,"inherits":42,"safer-buffer":211},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"./der":189,"inherits":42},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"./der":188,"inherits":42,"safer-buffer":211},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"inherits":42},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"../base/reporter":192,"inherits":42,"safer-buffer":211},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"../base/reporter":192,"../base/buffer":193,"minimalistic-assert":109},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"buffer":15,"./_stream_duplex":197,"../../../../process/browser.js":32,"util-deprecate":146,"inherits":42,"../errors":224,"./internal/streams/state":220,"./internal/streams/destroy":221,"./internal/streams/stream":222},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"../utils":130},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"./_stream_readable":200,"./_stream_writable":195,"../../../../process/browser.js":32,"inherits":42},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_transform":199,"inherits":42},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"../errors":224,"./_stream_duplex":197,"inherits":42},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"events":83,"./internal/streams/stream":222,"buffer":15,"util":77,"./internal/streams/destroy":221,"./internal/streams/state":220,"../errors":224,"./_stream_duplex":197,"../../../../process/browser.js":32,"inherits":42,"./internal/streams/from":225,"./internal/streams/buffer_list":226,"./internal/streams/async_iterator":227,"string_decoder/":270},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"../../../errors":224},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"minimalistic-assert":109},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./utils":201,"./cipher":203,"minimalistic-assert":109,"inherits":42},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":109,"inherits":42},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./cipher":203,"./des":204,"minimalistic-assert":109,"inherits":42},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"../process/browser.js":32,"./support/isBuffer":215,"inherits":223},"path":"preview-scripts/__node_modules/util/util.js"},{"deps":{"../../../errors":224,"./end-of-stream":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/ms/index.js"},{"deps":{"./internal/identifiers":230,"./internal/constants":233,"./functions/diff":236,"./functions/inc":231,"./ranges/max-satisfying":232,"./ranges/subset":265,"./internal/re":234,"./functions/major":235,"./ranges/simplify":267,"./functions/prerelease":238,"./functions/rcompare":239,"./functions/compare-build":241,"./functions/sort":243,"./functions/rsort":242,"./functions/lt":244,"./functions/gt":245,"./functions/compare-loose":240,"./functions/eq":246,"./functions/neq":247,"./functions/parse":248,"./functions/compare":249,"./functions/cmp":250,"./functions/gte":252,"./functions/coerce":251,"./functions/satisfies":253,"./classes/semver":254,"./ranges/min-version":255,"./functions/patch":256,"./ranges/valid":257,"./ranges/outside":258,"./functions/lte":259,"./ranges/ltr":260,"./ranges/intersects":261,"./functions/valid":262,"./ranges/min-satisfying":263,"./functions/clean":264,"./ranges/gtr":266,"./functions/minor":268,"./ranges/to-comparators":269,"./classes/range":237,"./classes/comparator":229},"path":"preview-scripts/__node_modules/semver/index.js"},{"deps":{"buffer":15,"../process/browser.js":32},"path":"preview-scripts/__node_modules/safer-buffer/safer.js"},{"deps":{"./aes":214,"./incr32":219,"safe-buffer":39,"cipher-base":41,"inherits":42,"buffer-xor":216,"./ghash":228},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{"./aes":214,"safe-buffer":39,"cipher-base":41,"inherits":42},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/support/isBufferBrowser.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{"stream":57,"util":207,"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"safe-buffer":275},"path":"preview-scripts/__node_modules/jws/lib/data-stream.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/jws/lib/tostring.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"../../../errors":224},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/node_modules/inherits/inherits_browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":15,"util":77},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"./end-of-stream":202,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"../functions/cmp":250,"./semver":254,"./range":237,"../internal/re":234,"../internal/parse-options":271,"../internal/debug":272},"path":"preview-scripts/__node_modules/semver/classes/comparator.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/identifiers.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/inc.js"},{"deps":{"../classes/semver":254,"../classes/range":237},"path":"preview-scripts/__node_modules/semver/ranges/max-satisfying.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/constants.js"},{"deps":{"./constants":233,"./debug":272},"path":"preview-scripts/__node_modules/semver/internal/re.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/major.js"},{"deps":{"./parse.js":248},"path":"preview-scripts/__node_modules/semver/functions/diff.js"},{"deps":{"../internal/parse-options":271,"./comparator":229,"./semver":254,"../internal/constants":233,"../internal/re":234,"../internal/debug":272,"../internal/lrucache":273},"path":"preview-scripts/__node_modules/semver/classes/range.js"},{"deps":{"./parse":248},"path":"preview-scripts/__node_modules/semver/functions/prerelease.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/rcompare.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/compare-loose.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/compare-build.js"},{"deps":{"./compare-build":241},"path":"preview-scripts/__node_modules/semver/functions/rsort.js"},{"deps":{"./compare-build":241},"path":"preview-scripts/__node_modules/semver/functions/sort.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/lt.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/gt.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/eq.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/neq.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/parse.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/compare.js"},{"deps":{"./eq":246,"./neq":247,"./gt":245,"./gte":252,"./lt":244,"./lte":259},"path":"preview-scripts/__node_modules/semver/functions/cmp.js"},{"deps":{"../classes/semver":254,"./parse":248,"../internal/re":234},"path":"preview-scripts/__node_modules/semver/functions/coerce.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/gte.js"},{"deps":{"../classes/range":237},"path":"preview-scripts/__node_modules/semver/functions/satisfies.js"},{"deps":{"../internal/debug":272,"../internal/constants":233,"../internal/re":234,"../internal/parse-options":271,"../internal/identifiers":230},"path":"preview-scripts/__node_modules/semver/classes/semver.js"},{"deps":{"../classes/semver":254,"../classes/range":237,"../functions/gt":245},"path":"preview-scripts/__node_modules/semver/ranges/min-version.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/patch.js"},{"deps":{"../classes/range":237},"path":"preview-scripts/__node_modules/semver/ranges/valid.js"},{"deps":{"../classes/semver":254,"../classes/comparator":229,"../classes/range":237,"../functions/satisfies":253,"../functions/gt":245,"../functions/lt":244,"../functions/lte":259,"../functions/gte":252},"path":"preview-scripts/__node_modules/semver/ranges/outside.js"},{"deps":{"./compare":249},"path":"preview-scripts/__node_modules/semver/functions/lte.js"},{"deps":{"./outside":258},"path":"preview-scripts/__node_modules/semver/ranges/ltr.js"},{"deps":{"../classes/range":237},"path":"preview-scripts/__node_modules/semver/ranges/intersects.js"},{"deps":{"./parse":248},"path":"preview-scripts/__node_modules/semver/functions/valid.js"},{"deps":{"../classes/semver":254,"../classes/range":237},"path":"preview-scripts/__node_modules/semver/ranges/min-satisfying.js"},{"deps":{"./parse":248},"path":"preview-scripts/__node_modules/semver/functions/clean.js"},{"deps":{"../classes/range.js":237,"../classes/comparator.js":229,"../functions/satisfies.js":253,"../functions/compare.js":249},"path":"preview-scripts/__node_modules/semver/ranges/subset.js"},{"deps":{"./outside":258},"path":"preview-scripts/__node_modules/semver/ranges/gtr.js"},{"deps":{"../functions/satisfies.js":253,"../functions/compare.js":249},"path":"preview-scripts/__node_modules/semver/ranges/simplify.js"},{"deps":{"../classes/semver":254},"path":"preview-scripts/__node_modules/semver/functions/minor.js"},{"deps":{"../classes/range":237},"path":"preview-scripts/__node_modules/semver/ranges/to-comparators.js"},{"deps":{"safe-buffer":142},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/parse-options.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32},"path":"preview-scripts/__node_modules/semver/internal/debug.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/lrucache.js"},{"deps":{"crypto":14,"util":207,"safe-buffer":275,"buffer-equal-constant-time":276,"ecdsa-sig-formatter":277},"path":"preview-scripts/__node_modules/jwa/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-equal-constant-time/index.js"},{"deps":{"./param-bytes-for-alg":278,"safe-buffer":275},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"},{"deps":{},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"}];
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
    