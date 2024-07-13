
(function () {
var scripts = [{"deps":{"./assets/Scripts/Config/GameConfig":4,"./assets/Scripts/GamesPrefab":1,"./assets/Scripts/PrefabScript/IframeScript":3,"./assets/Scripts/Lobby/Lobby":6,"./assets/Scripts/login/Login":5,"./assets/Scripts/ServerCom":2},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/GamesPrefab.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/ServerCom.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/PrefabScript/IframeScript.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/Config/GameConfig.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/login/Login.js"},{"deps":{"Login":5,"jsonwebtoken":7},"path":"preview-scripts/assets/Scripts/Lobby/Lobby.js"},{"deps":{"./lib/JsonWebTokenError":11,"./lib/TokenExpiredError":10,"./lib/NotBeforeError":8,"./decode":9,"./sign":12,"./verify":13},"path":"preview-scripts/__node_modules/jsonwebtoken/index.js"},{"deps":{"./JsonWebTokenError":11},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/NotBeforeError.js"},{"deps":{"jws":79},"path":"preview-scripts/__node_modules/jsonwebtoken/decode.js"},{"deps":{"./JsonWebTokenError":11},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/TokenExpiredError.js"},{"deps":{},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/JsonWebTokenError.js"},{"deps":{"./lib/psSupported":16,"./lib/validateAsymmetricKey":18,"buffer":15,"jws":79,"lodash.isplainobject":109,"lodash.isinteger":90,"lodash.isboolean":86,"lodash.isnumber":92,"lodash.includes":85,"lodash.isstring":107,"lodash.once":106,"./lib/timespan":17,"crypto":14},"path":"preview-scripts/__node_modules/jsonwebtoken/sign.js"},{"deps":{"crypto":14,"buffer":15,"./lib/JsonWebTokenError":11,"./lib/NotBeforeError":8,"./lib/TokenExpiredError":10,"./decode":9,"./lib/timespan":17,"./lib/validateAsymmetricKey":18,"./lib/psSupported":16,"jws":79},"path":"preview-scripts/__node_modules/jsonwebtoken/verify.js"},{"deps":{"randomfill":24,"randombytes":19,"pbkdf2":22,"create-hash":21,"diffie-hellman":23,"browserify-sign/algos":47,"create-ecdh":25,"create-hmac":20,"browserify-cipher":46,"public-encrypt":26,"browserify-sign":49},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":29},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/psSupported.js"},{"deps":{"ms":212},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/timespan.js"},{"deps":{"./rsaPssKeyDetailsSupported":67,"./asymmetricKeyDetailsSupported":73},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"},{"deps":{"../process/browser.js":32,"safe-buffer":39},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":40,"./legacy":33,"safe-buffer":39,"create-hash/md5":41,"sha.js":44,"cipher-base":42,"ripemd160":43},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"inherits":40,"ripemd160":43,"sha.js":44,"cipher-base":42,"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"./lib/sync":34,"./lib/async":30},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"./lib/primes.json":35,"buffer":15,"./lib/generatePrime":31,"./lib/dh":36},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"../process/browser.js":32,"randombytes":19,"safe-buffer":39},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{"buffer":15,"bn.js":50,"elliptic":48},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"./publicEncrypt":37,"./privateDecrypt":38},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"./precondition":51,"./sync":34,"safe-buffer":39,"./default-encoding":52,"./to-buffer":53},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"randombytes":19,"bn.js":76,"miller-rabin":68},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"inherits":40,"safe-buffer":39,"cipher-base":42},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"./precondition":51,"./default-encoding":52,"./to-buffer":53,"create-hash/md5":41,"ripemd160":43,"sha.js":44,"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./generatePrime":31,"buffer":15,"randombytes":19,"bn.js":76,"miller-rabin":68},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"./xor":54,"randombytes":19,"create-hash":21,"safe-buffer":39,"parse-asn1":65,"./mgf":56,"bn.js":81,"./withPublic":55,"browserify-rsa":112},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":56,"./xor":54,"./withPublic":55,"create-hash":21,"safe-buffer":39,"bn.js":81,"browserify-rsa":112,"parse-asn1":65},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"safe-buffer":39,"inherits":40,"string_decoder":62,"stream":57},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"buffer":15,"inherits":40,"hash-base":66},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"./sha1":58,"./sha224":60,"./sha256":63,"./sha384":64,"./sha512":61,"./sha":59},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"safe-buffer":39,"inherits":40,"hash-base":66},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"evp_bytestokey":80,"browserify-aes/browser":121,"browserify-des/modes":120,"browserify-des":124,"browserify-aes/modes":122},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"./browser/algorithms.json":82},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"../package.json":74,"brorand":77,"./elliptic/utils":69,"./elliptic/curve":70,"./elliptic/curves":75,"./elliptic/ec":72,"./elliptic/eddsa":71},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"./algorithms.json":82,"create-hash":21,"inherits":40,"./sign":108,"safe-buffer":133,"./verify":110,"readable-stream":142},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":32},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/to-buffer.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"bn.js":81,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{"create-hash":21,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"events":83,"inherits":40,"readable-stream/transform.js":103,"readable-stream/passthrough.js":104,"readable-stream/writable.js":91,"readable-stream/duplex.js":102,"readable-stream/readable.js":105},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"inherits":40,"safe-buffer":39,"./hash":84},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./sha256":63,"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./sha512":61,"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./aesid.json":88,"pbkdf2":22,"safe-buffer":39,"browserify-aes":121,"./asn1":87,"./fixProc":89},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":40,"safe-buffer":113,"readable-stream":117},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"},{"deps":{"brorand":77,"bn.js":118},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"bn.js":119,"minimalistic-assert":111,"minimalistic-crypto-utils":114},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":93,"./short":94,"./mont":95,"./edwards":96},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../curves":75,"../utils":69,"./key":99,"./signature":98,"hash.js":115},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{"../utils":69,"../curves":75,"brorand":77,"./key":97,"./signature":100,"bn.js":119,"hmac-drbg":116},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":70,"./utils":69,"./precomputed/secp256k1":101,"hash.js":115},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{"crypto":78},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"./lib/verify-stream":144,"./lib/sign-stream":148},"path":"preview-scripts/__node_modules/jws/index.js"},{"deps":{"safe-buffer":39,"md5.js":45},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.includes/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isboolean/index.js"},{"deps":{"./certificate":125,"asn1.js":131},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"safe-buffer":39,"evp_bytestokey":80,"browserify-aes":121},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isinteger/index.js"},{"deps":{"./lib/_stream_writable.js":123},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isnumber/index.js"},{"deps":{"../utils":69,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"../utils":69,"./base":93,"bn.js":119,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"./base":93,"../utils":69,"bn.js":119,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":69,"./base":93,"bn.js":119,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"../utils":69,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":69,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"../utils":69},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"../utils":69,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"./lib/_stream_duplex.js":126},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./readable":105},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"./readable":105},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./lib/_stream_writable.js":123,"./lib/_stream_duplex.js":126,"./lib/_stream_transform.js":128,"./lib/_stream_passthrough.js":129,"./lib/_stream_readable.js":127},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.once/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isstring/index.js"},{"deps":{"./curves.json":150,"create-hmac":20,"elliptic":48,"parse-asn1":65,"bn.js":151,"browserify-rsa":112,"safe-buffer":133},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isplainobject/index.js"},{"deps":{"./curves.json":150,"elliptic":48,"parse-asn1":65,"bn.js":151,"safe-buffer":133},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"buffer":15,"randombytes":19,"bn.js":151},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"./hash/ripemd":136,"./hash/utils":130,"./hash/common":134,"./hash/hmac":137,"./hash/sha":135},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"hash.js":115,"minimalistic-crypto-utils":114,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./lib/internal/streams/end-of-stream.js":143,"./lib/internal/streams/pipeline.js":149,"./lib/_stream_duplex.js":141,"./lib/_stream_transform.js":139,"./lib/_stream_passthrough.js":140,"./lib/_stream_writable.js":132,"./lib/_stream_readable.js":138},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./modes/list.json":174,"./decrypter":182,"./encrypter":181},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"./ecb":176,"./list.json":174,"./cfb8":175,"./cfb1":177,"./cfb":173,"./ofb":178,"./ctr":180,"./cbc":179},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"./_stream_duplex":126,"../../process/browser.js":32,"inherits":40,"./internal/streams/stream":147,"safe-buffer":39,"process-nextick-args":145,"core-util-is":154,"util-deprecate":146,"./internal/streams/destroy":153},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"cipher-base":42,"inherits":40,"safe-buffer":39,"des.js":184},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"asn1.js":131},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"./_stream_readable":127,"./_stream_writable":123,"inherits":40,"process-nextick-args":145,"core-util-is":154},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"events":83,"./internal/streams/stream":147,"util":78,"./internal/streams/destroy":153,"./_stream_duplex":126,"../../process/browser.js":32,"safe-buffer":39,"inherits":40,"process-nextick-args":145,"core-util-is":154,"isarray":172,"./internal/streams/BufferList":152,"string_decoder/":183},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_duplex":126,"inherits":40,"core-util-is":154},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":128,"inherits":40,"core-util-is":154},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"minimalistic-assert":111,"inherits":40},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"./asn1/constants":157,"./asn1/api":155,"bn.js":185,"./asn1/encoders":158,"./asn1/base":159,"./asn1/decoders":156},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"./internal/streams/stream":161,"buffer":15,"./internal/streams/destroy":162,"./internal/streams/state":164,"../errors":163,"./_stream_duplex":141,"../../../../process/browser.js":32,"inherits":40,"util-deprecate":146},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"},{"deps":{"./utils":130,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./sha/224":165,"./sha/384":167,"./sha/1":160,"./sha/256":166,"./sha/512":168},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":130,"./common":134},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./utils":130,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"events":83,"buffer":15,"util":78,"../errors":163,"./_stream_duplex":141,"./internal/streams/from":170,"../../../../process/browser.js":32,"./internal/streams/stream":161,"./internal/streams/buffer_list":171,"./internal/streams/destroy":162,"./internal/streams/state":164,"inherits":40,"./internal/streams/async_iterator":169,"string_decoder/":186},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../errors":163,"./_stream_duplex":141,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":139,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_readable":138,"./_stream_writable":132,"../../../../process/browser.js":32,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./lib/internal/streams/end-of-stream.js":202,"./lib/internal/streams/pipeline.js":208,"./lib/_stream_writable.js":198,"./lib/_stream_duplex.js":200,"./lib/_stream_transform.js":199,"./lib/_stream_passthrough.js":201,"./lib/_stream_readable.js":194},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"../../../errors":163},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"stream":57,"util":197,"./tostring":213,"jwa":274,"./data-stream":214,"safe-buffer":275},"path":"preview-scripts/__node_modules/jws/lib/verify-stream.js"},{"deps":{"../process/browser.js":32},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"stream":57,"./data-stream":214,"./tostring":213,"util":197,"safe-buffer":275,"jwa":274},"path":"preview-scripts/__node_modules/jws/lib/sign-stream.js"},{"deps":{"../../../errors":163,"./end-of-stream":143},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"util":78,"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"process-nextick-args":145},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"./encoders":158,"./decoders":156,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./der":187,"./pem":193},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./der":195},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./pem":191,"./der":188},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"./reporter":190,"./node":192,"./buffer":189},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"../utils":130,"../common":134,"./common":196},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../errors":163},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../utils":130,"./256":166},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":130,"../common":134,"./common":196,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":130,"./512":168},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":130,"../common":134,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"./end-of-stream":143,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":15,"util":78},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"safe-buffer":39,"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"buffer":15,"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{"../incr32":216,"safe-buffer":39,"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"./modes":122,"safe-buffer":39,"cipher-base":42,"evp_bytestokey":80,"inherits":40,"./streamCipher":218,"./aes":217,"./authCipher":219},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{"./authCipher":219,"./modes":122,"./streamCipher":218,"./aes":217,"safe-buffer":39,"cipher-base":42,"evp_bytestokey":80,"inherits":40},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./des/utils":203,"./des/cipher":204,"./des/des":205,"./des/cbc":206,"./des/ede":207},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"safe-buffer":113},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../base/buffer":189,"../base/node":192,"../constants/der":195,"inherits":40,"bn.js":185},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"../base/node":192,"../constants/der":195,"inherits":40,"safer-buffer":215},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"../base/reporter":190,"inherits":40,"safer-buffer":215},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"./der":188,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"../base/reporter":190,"../base/buffer":189,"minimalistic-assert":111},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"./der":187,"inherits":40,"safer-buffer":215},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"events":83,"buffer":15,"util":78,"../errors":223,"./_stream_duplex":200,"./internal/streams/from":226,"../../../../process/browser.js":32,"inherits":40,"./internal/streams/stream":225,"./internal/streams/destroy":222,"./internal/streams/state":224,"./internal/streams/buffer_list":221,"./internal/streams/async_iterator":227,"string_decoder/":270},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"../utils":130},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"./support/isBuffer":211,"../process/browser.js":32,"inherits":220},"path":"preview-scripts/__node_modules/util/util.js"},{"deps":{"./internal/streams/stream":225,"buffer":15,"./internal/streams/destroy":222,"./internal/streams/state":224,"../errors":223,"./_stream_duplex":200,"../../../../process/browser.js":32,"util-deprecate":146,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"../errors":223,"./_stream_duplex":200,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_readable":194,"./_stream_writable":198,"../../../../process/browser.js":32,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_transform":199,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"../../../errors":223},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"minimalistic-assert":111},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./utils":203,"./cipher":204,"minimalistic-assert":111,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":111,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./cipher":204,"./des":205,"minimalistic-assert":111,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"../../../errors":223,"./end-of-stream":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"./internal/constants":233,"./internal/identifiers":229,"./functions/diff":264,"./ranges/simplify":268,"./ranges/subset":269,"./functions/valid":230,"./classes/semver":265,"./functions/minor":236,"./functions/inc":245,"./classes/comparator":231,"./functions/sort":239,"./functions/compare":260,"./functions/rsort":250,"./functions/compare-loose":263,"./functions/clean":234,"./functions/compare-build":244,"./functions/lt":251,"./functions/gt":241,"./functions/patch":262,"./functions/prerelease":238,"./functions/neq":243,"./functions/rcompare":240,"./functions/gte":247,"./functions/eq":242,"./functions/lte":246,"./functions/parse":259,"./functions/major":237,"./functions/coerce":248,"./functions/satisfies":252,"./ranges/min-satisfying":253,"./ranges/min-version":254,"./ranges/valid":255,"./ranges/ltr":261,"./ranges/intersects":266,"./ranges/gtr":258,"./ranges/outside":257,"./functions/cmp":249,"./ranges/to-comparators":267,"./ranges/max-satisfying":232,"./classes/range":256,"./internal/re":235},"path":"preview-scripts/__node_modules/semver/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/support/isBufferBrowser.js"},{"deps":{},"path":"preview-scripts/__node_modules/ms/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/jws/lib/tostring.js"},{"deps":{"stream":57,"util":197,"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32,"safe-buffer":275},"path":"preview-scripts/__node_modules/jws/lib/data-stream.js"},{"deps":{"buffer":15,"../process/browser.js":32},"path":"preview-scripts/__node_modules/safer-buffer/safer.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{"./aes":217,"safe-buffer":39,"cipher-base":42,"inherits":40},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":217,"./incr32":216,"safe-buffer":39,"cipher-base":42,"inherits":40,"buffer-xor":210,"./ghash":228},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/node_modules/inherits/inherits_browser.js"},{"deps":{"util":78,"buffer":15},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../errors":223},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"events":83},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"./end-of-stream":202,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/identifiers.js"},{"deps":{"./parse":259},"path":"preview-scripts/__node_modules/semver/functions/valid.js"},{"deps":{"../internal/re":235,"../internal/debug":271,"../internal/parse-options":273,"../functions/cmp":249,"./semver":265,"./range":256},"path":"preview-scripts/__node_modules/semver/classes/comparator.js"},{"deps":{"../classes/semver":265,"../classes/range":256},"path":"preview-scripts/__node_modules/semver/ranges/max-satisfying.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/constants.js"},{"deps":{"./parse":259},"path":"preview-scripts/__node_modules/semver/functions/clean.js"},{"deps":{"./constants":233,"./debug":271},"path":"preview-scripts/__node_modules/semver/internal/re.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/minor.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/major.js"},{"deps":{"./parse":259},"path":"preview-scripts/__node_modules/semver/functions/prerelease.js"},{"deps":{"./compare-build":244},"path":"preview-scripts/__node_modules/semver/functions/sort.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/rcompare.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/gt.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/eq.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/neq.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/compare-build.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/inc.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/lte.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/gte.js"},{"deps":{"./parse":259,"../classes/semver":265,"../internal/re":235},"path":"preview-scripts/__node_modules/semver/functions/coerce.js"},{"deps":{"./gt":241,"./eq":242,"./lt":251,"./neq":243,"./lte":246,"./gte":247},"path":"preview-scripts/__node_modules/semver/functions/cmp.js"},{"deps":{"./compare-build":244},"path":"preview-scripts/__node_modules/semver/functions/rsort.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/lt.js"},{"deps":{"../classes/range":256},"path":"preview-scripts/__node_modules/semver/functions/satisfies.js"},{"deps":{"../classes/range":256,"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/ranges/min-satisfying.js"},{"deps":{"../classes/semver":265,"../classes/range":256,"../functions/gt":241},"path":"preview-scripts/__node_modules/semver/ranges/min-version.js"},{"deps":{"../classes/range":256},"path":"preview-scripts/__node_modules/semver/ranges/valid.js"},{"deps":{"./comparator":231,"../internal/debug":271,"./semver":265,"../internal/constants":233,"../internal/re":235,"../internal/parse-options":273,"../internal/lrucache":272},"path":"preview-scripts/__node_modules/semver/classes/range.js"},{"deps":{"../classes/comparator":231,"../classes/range":256,"../classes/semver":265,"../functions/satisfies":252,"../functions/gt":241,"../functions/lt":251,"../functions/lte":246,"../functions/gte":247},"path":"preview-scripts/__node_modules/semver/ranges/outside.js"},{"deps":{"./outside":257},"path":"preview-scripts/__node_modules/semver/ranges/gtr.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/parse.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/compare.js"},{"deps":{"./outside":257},"path":"preview-scripts/__node_modules/semver/ranges/ltr.js"},{"deps":{"../classes/semver":265},"path":"preview-scripts/__node_modules/semver/functions/patch.js"},{"deps":{"./compare":260},"path":"preview-scripts/__node_modules/semver/functions/compare-loose.js"},{"deps":{"./parse.js":259},"path":"preview-scripts/__node_modules/semver/functions/diff.js"},{"deps":{"../internal/debug":271,"../internal/constants":233,"../internal/re":235,"../internal/identifiers":229,"../internal/parse-options":273},"path":"preview-scripts/__node_modules/semver/classes/semver.js"},{"deps":{"../classes/range":256},"path":"preview-scripts/__node_modules/semver/ranges/intersects.js"},{"deps":{"../classes/range":256},"path":"preview-scripts/__node_modules/semver/ranges/to-comparators.js"},{"deps":{"../functions/compare.js":260,"../functions/satisfies.js":252},"path":"preview-scripts/__node_modules/semver/ranges/simplify.js"},{"deps":{"../functions/satisfies.js":252,"../classes/comparator.js":231,"../functions/compare.js":260,"../classes/range.js":256},"path":"preview-scripts/__node_modules/semver/ranges/subset.js"},{"deps":{"safe-buffer":133},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":32},"path":"preview-scripts/__node_modules/semver/internal/debug.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/lrucache.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/parse-options.js"},{"deps":{"crypto":14,"util":197,"safe-buffer":275,"buffer-equal-constant-time":276,"ecdsa-sig-formatter":277},"path":"preview-scripts/__node_modules/jwa/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-equal-constant-time/index.js"},{"deps":{"./param-bytes-for-alg":278,"safe-buffer":275},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"},{"deps":{},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"}];
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
    