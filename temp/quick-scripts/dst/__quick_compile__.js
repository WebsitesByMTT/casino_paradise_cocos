
(function () {
var scripts = [{"deps":{"./assets/Scripts/GamesPrefab":1,"./assets/Scripts/ServerCom":2,"./assets/Scripts/Config/GameConfig":3,"./assets/Scripts/login/Login":4,"./assets/Scripts/PrefabScript/IframeScript":6,"./assets/Scripts/Lobby/Lobby":5},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/GamesPrefab.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/ServerCom.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/Config/GameConfig.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/login/Login.js"},{"deps":{"Login":4,"jsonwebtoken":7},"path":"preview-scripts/assets/Scripts/Lobby/Lobby.js"},{"deps":{},"path":"preview-scripts/assets/Scripts/PrefabScript/IframeScript.js"},{"deps":{"./lib/JsonWebTokenError":11,"./lib/NotBeforeError":8,"./lib/TokenExpiredError":10,"./decode":9,"./verify":12,"./sign":13},"path":"preview-scripts/__node_modules/jsonwebtoken/index.js"},{"deps":{"./JsonWebTokenError":11},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/NotBeforeError.js"},{"deps":{"jws":80},"path":"preview-scripts/__node_modules/jsonwebtoken/decode.js"},{"deps":{"./JsonWebTokenError":11},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/TokenExpiredError.js"},{"deps":{},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/JsonWebTokenError.js"},{"deps":{"crypto":14,"buffer":15,"./lib/JsonWebTokenError":11,"./lib/NotBeforeError":8,"./lib/TokenExpiredError":10,"./decode":9,"jws":80,"./lib/timespan":17,"./lib/validateAsymmetricKey":18,"./lib/psSupported":16},"path":"preview-scripts/__node_modules/jsonwebtoken/verify.js"},{"deps":{"./lib/timespan":17,"./lib/psSupported":16,"./lib/validateAsymmetricKey":18,"buffer":15,"lodash.includes":86,"lodash.isplainobject":88,"lodash.once":90,"lodash.isinteger":93,"lodash.isnumber":97,"lodash.isstring":99,"lodash.isboolean":101,"crypto":14,"jws":80},"path":"preview-scripts/__node_modules/jsonwebtoken/sign.js"},{"deps":{"randomfill":22,"randombytes":25,"pbkdf2":19,"browserify-sign/algos":47,"diffie-hellman":20,"create-hmac":24,"create-hash":23,"create-ecdh":21,"browserify-cipher":46,"public-encrypt":26,"browserify-sign":48},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":29},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":35,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/psSupported.js"},{"deps":{"ms":211},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/timespan.js"},{"deps":{"./asymmetricKeyDetailsSupported":67,"./rsaPssKeyDetailsSupported":70},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"},{"deps":{"./lib/sync":32,"./lib/async":30},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"buffer":15,"./lib/primes.json":33,"./lib/dh":34,"./lib/generatePrime":31},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"buffer":15,"bn.js":50,"elliptic":49},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"randombytes":25,"../process/browser.js":35,"safe-buffer":39},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{"inherits":40,"ripemd160":41,"sha.js":43,"cipher-base":45,"md5.js":44},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"inherits":40,"safe-buffer":39,"./legacy":36,"create-hash/md5":42,"ripemd160":41,"sha.js":43,"cipher-base":45},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"safe-buffer":39,"../process/browser.js":35},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"./publicEncrypt":37,"./privateDecrypt":38},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"./sync":32,"safe-buffer":39,"./precondition":51,"./default-encoding":52,"./to-buffer":53},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"randombytes":25,"bn.js":76,"miller-rabin":66},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"./precondition":51,"./default-encoding":52,"./to-buffer":53,"create-hash/md5":42,"ripemd160":41,"sha.js":43,"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./generatePrime":31,"buffer":15,"bn.js":76,"miller-rabin":66,"randombytes":25},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"inherits":40,"safe-buffer":39,"cipher-base":45},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"randombytes":25,"create-hash":23,"safe-buffer":39,"parse-asn1":63,"bn.js":81,"./xor":56,"./mgf":54,"browserify-rsa":112,"./withPublic":55},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":54,"./xor":56,"./withPublic":55,"create-hash":23,"safe-buffer":39,"bn.js":81,"browserify-rsa":112,"parse-asn1":63},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"buffer":15,"inherits":40,"hash-base":68},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"md5.js":44},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"./sha1":58,"./sha256":59,"./sha":60,"./sha384":61,"./sha512":62,"./sha224":57},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"inherits":40,"safe-buffer":39,"hash-base":68},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"safe-buffer":39,"inherits":40,"string_decoder":65,"stream":64},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"browserify-aes/browser":119,"evp_bytestokey":79,"browserify-des/modes":122,"browserify-des":125,"browserify-aes/modes":121},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"./browser/algorithms.json":82},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"./algorithms.json":82,"create-hash":23,"inherits":40,"./sign":83,"safe-buffer":126,"./verify":85,"readable-stream":131},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":74,"brorand":78,"./elliptic/curve":72,"./elliptic/eddsa":73,"./elliptic/utils":69,"./elliptic/ec":71,"./elliptic/curves":75},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":35},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/to-buffer.js"},{"deps":{"create-hash":23,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"bn.js":81,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"./sha256":59,"inherits":40,"safe-buffer":39,"./hash":84},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./sha512":62,"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":84,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"pbkdf2":19,"safe-buffer":39,"./aesid.json":89,"./fixProc":91,"./asn1":87,"browserify-aes":119},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":40,"events":92,"readable-stream/passthrough.js":109,"readable-stream/transform.js":111,"readable-stream/duplex.js":108,"readable-stream/writable.js":106,"readable-stream/readable.js":110},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"brorand":78,"bn.js":118},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":35,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"},{"deps":{"inherits":40,"safe-buffer":113,"readable-stream":117},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"bn.js":120,"minimalistic-assert":107,"minimalistic-crypto-utils":114},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":35,"semver":209},"path":"preview-scripts/__node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"},{"deps":{"../utils":69,"../curves":75,"brorand":78,"./key":94,"./signature":100,"hmac-drbg":115,"bn.js":120},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"./short":95,"./edwards":96,"./mont":98,"./base":102},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../curves":75,"../utils":69,"hash.js":116,"./key":104,"./signature":105},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":72,"./utils":69,"./precomputed/secp256k1":103,"hash.js":116},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"crypto":77},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"safe-buffer":39,"md5.js":44},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"./lib/verify-stream":146,"./lib/sign-stream":148},"path":"preview-scripts/__node_modules/jws/index.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{"create-hmac":24,"elliptic":49,"parse-asn1":63,"bn.js":144,"safe-buffer":126,"browserify-rsa":112,"./curves.json":143},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{"./curves.json":143,"elliptic":49,"parse-asn1":63,"safe-buffer":126,"bn.js":144},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.includes/index.js"},{"deps":{"./certificate":123,"asn1.js":133},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isplainobject/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.once/index.js"},{"deps":{"evp_bytestokey":79,"safe-buffer":39,"browserify-aes":119},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isinteger/index.js"},{"deps":{"../utils":69,"bn.js":120},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":69,"./base":102,"bn.js":120,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":69,"./base":102,"bn.js":120,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isnumber/index.js"},{"deps":{"./base":102,"../utils":69,"bn.js":120,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isstring/index.js"},{"deps":{"../utils":69,"bn.js":120},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{},"path":"preview-scripts/__node_modules/lodash.isboolean/index.js"},{"deps":{"../utils":69,"bn.js":120},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"../utils":69},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"../utils":69,"bn.js":120},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"./lib/_stream_writable.js":124},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"./lib/_stream_duplex.js":130},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./readable":110},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./lib/_stream_writable.js":124,"./lib/_stream_duplex.js":130,"./lib/_stream_passthrough.js":127,"./lib/_stream_transform.js":128,"./lib/_stream_readable.js":129},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"./readable":110},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"buffer":15,"bn.js":144,"randombytes":25},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"hash.js":116,"minimalistic-crypto-utils":114,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./hash/ripemd":136,"./hash/utils":132,"./hash/common":135,"./hash/hmac":138,"./hash/sha":137},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"./lib/_stream_duplex.js":139,"./lib/_stream_transform.js":140,"./lib/_stream_passthrough.js":141,"./lib/_stream_writable.js":142,"./lib/internal/streams/end-of-stream.js":145,"./lib/internal/streams/pipeline.js":147,"./lib/_stream_readable.js":134},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"./modes/list.json":172,"./decrypter":179,"./encrypter":177},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"./list.json":172,"./ecb":178,"./cfb8":174,"./cfb1":176,"./ofb":181,"./cfb":173,"./cbc":175,"./ctr":180},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"asn1.js":133},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"./_stream_duplex":130,"../../process/browser.js":35,"inherits":40,"safe-buffer":39,"util-deprecate":151,"process-nextick-args":150,"./internal/streams/stream":155,"core-util-is":160,"./internal/streams/destroy":159},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"inherits":40,"safe-buffer":39,"cipher-base":45,"des.js":184},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"},{"deps":{"./_stream_transform":128,"core-util-is":160,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_duplex":130,"core-util-is":160,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"events":92,"./internal/streams/stream":155,"util":77,"./internal/streams/destroy":159,"./_stream_duplex":130,"../../process/browser.js":35,"process-nextick-args":150,"safe-buffer":39,"core-util-is":160,"inherits":40,"./internal/streams/BufferList":149,"isarray":182,"string_decoder/":183},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_readable":129,"./_stream_writable":124,"process-nextick-args":150,"core-util-is":160,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./lib/_stream_duplex.js":188,"./lib/_stream_passthrough.js":189,"./lib/_stream_transform.js":191,"./lib/internal/streams/end-of-stream.js":198,"./lib/internal/streams/pipeline.js":203,"./lib/_stream_writable.js":185,"./lib/_stream_readable.js":190},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"minimalistic-assert":107,"inherits":40},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"./asn1/api":152,"./asn1/constants":154,"bn.js":187,"./asn1/base":157,"./asn1/encoders":153,"./asn1/decoders":156},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"events":92,"buffer":15,"util":77,"./_stream_duplex":139,"../../../../process/browser.js":35,"inherits":40,"../errors":162,"./internal/streams/from":166,"./internal/streams/destroy":161,"./internal/streams/stream":163,"./internal/streams/state":164,"./internal/streams/async_iterator":165,"./internal/streams/buffer_list":167,"string_decoder/":186},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./utils":132,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./utils":132,"./common":135},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./sha/224":168,"./sha/384":169,"./sha/256":170,"./sha/512":171,"./sha/1":158},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":132,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./_stream_readable":134,"./_stream_writable":142,"../../../../process/browser.js":35,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"../errors":162,"./_stream_duplex":139,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_transform":140,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./internal/streams/stream":163,"buffer":15,"./internal/streams/destroy":161,"./internal/streams/state":164,"../errors":162,"./_stream_duplex":139,"../../../../process/browser.js":35,"util-deprecate":151,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":162},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"stream":64,"util":202,"./tostring":216,"safe-buffer":274,"jwa":275,"./data-stream":214},"path":"preview-scripts/__node_modules/jws/lib/verify-stream.js"},{"deps":{"../../../errors":162,"./end-of-stream":145},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"stream":64,"util":202,"./data-stream":214,"./tostring":216,"safe-buffer":274,"jwa":275},"path":"preview-scripts/__node_modules/jws/lib/sign-stream.js"},{"deps":{"util":77,"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"../process/browser.js":35},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"./encoders":153,"./decoders":156,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./pem":194,"./der":192},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"./der":193},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"events":92},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"./der":196,"./pem":195},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./reporter":197,"./node":199,"./buffer":200},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"../utils":132,"../common":135,"./common":201},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"process-nextick-args":150},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"../../../../../../process/browser.js":35},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"events":92},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":162},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"./end-of-stream":145,"../../../../../../process/browser.js":35},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":15,"util":77},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"../utils":132,"./256":170},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":132,"./512":171},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":132,"../common":135,"./common":201,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":132,"../common":135,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"safe-buffer":39,"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"./modes":121,"safe-buffer":39,"cipher-base":45,"evp_bytestokey":79,"inherits":40,"./aes":215,"./streamCipher":218,"./authCipher":219},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"./authCipher":219,"./modes":121,"./streamCipher":218,"./aes":215,"safe-buffer":39,"cipher-base":45,"evp_bytestokey":79,"inherits":40},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"safe-buffer":39,"buffer-xor":210,"../incr32":217},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"buffer":15,"buffer-xor":210},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./des/utils":204,"./des/cipher":205,"./des/des":206,"./des/ede":207,"./des/cbc":208},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"buffer":15,"./_stream_duplex":188,"../../../../process/browser.js":35,"util-deprecate":151,"inherits":40,"../errors":223,"./internal/streams/destroy":220,"./internal/streams/stream":221,"./internal/streams/state":222},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"safe-buffer":113},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":77},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_readable":190,"./_stream_writable":185,"../../../../process/browser.js":35,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_transform":191,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"events":92,"./internal/streams/stream":221,"buffer":15,"util":77,"./internal/streams/destroy":220,"./internal/streams/state":222,"../errors":223,"./_stream_duplex":188,"../../../../process/browser.js":35,"inherits":40,"./internal/streams/from":225,"./internal/streams/buffer_list":226,"./internal/streams/async_iterator":227,"string_decoder/":270},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../errors":223,"./_stream_duplex":188,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"../base/node":199,"../constants/der":193,"inherits":40,"safer-buffer":213},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"./der":192,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"./der":196,"inherits":40,"safer-buffer":213},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"../base/buffer":200,"../base/node":199,"../constants/der":193,"inherits":40,"bn.js":187},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"../../../errors":223},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../base/reporter":197,"../base/buffer":200,"minimalistic-assert":107},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"../base/reporter":197,"inherits":40,"safer-buffer":213},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"../utils":132},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"../process/browser.js":35,"./support/isBuffer":212,"inherits":224},"path":"preview-scripts/__node_modules/util/util.js"},{"deps":{"../../../errors":223,"./end-of-stream":198},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"minimalistic-assert":107},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./utils":204,"./cipher":205,"minimalistic-assert":107,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"./cipher":205,"./des":206,"minimalistic-assert":107,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"minimalistic-assert":107,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./internal/constants":229,"./internal/identifiers":233,"./functions/diff":235,"./functions/valid":231,"./ranges/max-satisfying":232,"./classes/semver":234,"./internal/re":236,"./functions/patch":237,"./functions/minor":238,"./functions/prerelease":239,"./functions/inc":240,"./functions/clean":241,"./functions/major":242,"./functions/compare":243,"./functions/sort":244,"./functions/rsort":246,"./functions/rcompare":247,"./functions/compare-build":249,"./functions/lt":250,"./functions/gt":248,"./functions/lte":251,"./functions/compare-loose":252,"./ranges/simplify":267,"./functions/coerce":253,"./functions/parse":254,"./functions/cmp":255,"./ranges/min-satisfying":256,"./ranges/min-version":257,"./ranges/valid":258,"./ranges/gtr":259,"./ranges/outside":260,"./functions/gte":261,"./ranges/ltr":262,"./functions/eq":263,"./ranges/subset":269,"./functions/neq":264,"./functions/satisfies":265,"./ranges/intersects":266,"./ranges/to-comparators":268,"./classes/range":245,"./classes/comparator":230},"path":"preview-scripts/__node_modules/semver/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ms/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/support/isBufferBrowser.js"},{"deps":{"buffer":15,"../process/browser.js":35},"path":"preview-scripts/__node_modules/safer-buffer/safer.js"},{"deps":{"util":202,"stream":64,"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":35,"safe-buffer":274},"path":"preview-scripts/__node_modules/jws/lib/data-stream.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/jws/lib/tostring.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"./aes":215,"safe-buffer":39,"inherits":40,"cipher-base":45},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":215,"./incr32":217,"cipher-base":45,"inherits":40,"safe-buffer":39,"buffer-xor":210,"./ghash":228},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{"../../../../../../process/browser.js":35},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"events":92},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":223},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/util/node_modules/inherits/inherits_browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":15,"util":77},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"./end-of-stream":198,"../../../../../../process/browser.js":35},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/constants.js"},{"deps":{"../internal/re":236,"../functions/cmp":255,"./range":245,"./semver":234,"../internal/parse-options":271,"../internal/debug":272},"path":"preview-scripts/__node_modules/semver/classes/comparator.js"},{"deps":{"./parse":254},"path":"preview-scripts/__node_modules/semver/functions/valid.js"},{"deps":{"../classes/semver":234,"../classes/range":245},"path":"preview-scripts/__node_modules/semver/ranges/max-satisfying.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/identifiers.js"},{"deps":{"../internal/debug":272,"../internal/constants":229,"../internal/parse-options":271,"../internal/identifiers":233,"../internal/re":236},"path":"preview-scripts/__node_modules/semver/classes/semver.js"},{"deps":{"./parse.js":254},"path":"preview-scripts/__node_modules/semver/functions/diff.js"},{"deps":{"./constants":229,"./debug":272},"path":"preview-scripts/__node_modules/semver/internal/re.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/patch.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/minor.js"},{"deps":{"./parse":254},"path":"preview-scripts/__node_modules/semver/functions/prerelease.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/inc.js"},{"deps":{"./parse":254},"path":"preview-scripts/__node_modules/semver/functions/clean.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/major.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/compare.js"},{"deps":{"./compare-build":249},"path":"preview-scripts/__node_modules/semver/functions/sort.js"},{"deps":{"../internal/debug":272,"./semver":234,"../internal/re":236,"../internal/constants":229,"./comparator":230,"../internal/parse-options":271,"../internal/lrucache":273},"path":"preview-scripts/__node_modules/semver/classes/range.js"},{"deps":{"./compare-build":249},"path":"preview-scripts/__node_modules/semver/functions/rsort.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/rcompare.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/gt.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/compare-build.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/lt.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/lte.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/compare-loose.js"},{"deps":{"../classes/semver":234,"./parse":254,"../internal/re":236},"path":"preview-scripts/__node_modules/semver/functions/coerce.js"},{"deps":{"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/functions/parse.js"},{"deps":{"./eq":263,"./neq":264,"./gte":261,"./lt":250,"./gt":248,"./lte":251},"path":"preview-scripts/__node_modules/semver/functions/cmp.js"},{"deps":{"../classes/range":245,"../classes/semver":234},"path":"preview-scripts/__node_modules/semver/ranges/min-satisfying.js"},{"deps":{"../classes/semver":234,"../classes/range":245,"../functions/gt":248},"path":"preview-scripts/__node_modules/semver/ranges/min-version.js"},{"deps":{"../classes/range":245},"path":"preview-scripts/__node_modules/semver/ranges/valid.js"},{"deps":{"./outside":260},"path":"preview-scripts/__node_modules/semver/ranges/gtr.js"},{"deps":{"../classes/semver":234,"../classes/comparator":230,"../classes/range":245,"../functions/satisfies":265,"../functions/gt":248,"../functions/lt":250,"../functions/lte":251,"../functions/gte":261},"path":"preview-scripts/__node_modules/semver/ranges/outside.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/gte.js"},{"deps":{"./outside":260},"path":"preview-scripts/__node_modules/semver/ranges/ltr.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/eq.js"},{"deps":{"./compare":243},"path":"preview-scripts/__node_modules/semver/functions/neq.js"},{"deps":{"../classes/range":245},"path":"preview-scripts/__node_modules/semver/functions/satisfies.js"},{"deps":{"../classes/range":245},"path":"preview-scripts/__node_modules/semver/ranges/intersects.js"},{"deps":{"../functions/satisfies.js":265,"../functions/compare.js":243},"path":"preview-scripts/__node_modules/semver/ranges/simplify.js"},{"deps":{"../classes/range":245},"path":"preview-scripts/__node_modules/semver/ranges/to-comparators.js"},{"deps":{"../classes/range.js":245,"../classes/comparator.js":230,"../functions/satisfies.js":265,"../functions/compare.js":243},"path":"preview-scripts/__node_modules/semver/ranges/subset.js"},{"deps":{"safe-buffer":126},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/parse-options.js"},{"deps":{"../../../../../../../Applications/Cocos/Creator/2.4.7/CocosCreator.app/Contents/Resources/app.asar/node_modules/process/browser.js":35},"path":"preview-scripts/__node_modules/semver/internal/debug.js"},{"deps":{},"path":"preview-scripts/__node_modules/semver/internal/lrucache.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"crypto":14,"util":202,"safe-buffer":274,"buffer-equal-constant-time":276,"ecdsa-sig-formatter":277},"path":"preview-scripts/__node_modules/jwa/index.js"},{"deps":{"buffer":15},"path":"preview-scripts/__node_modules/buffer-equal-constant-time/index.js"},{"deps":{"./param-bytes-for-alg":278,"safe-buffer":274},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"},{"deps":{},"path":"preview-scripts/__node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"}];
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
    