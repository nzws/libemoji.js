import bindings from 'bindings';

const addon = bindings({
  bindings: 'emoji'
});

console.log(addon.hello()); // 'world'

console.log(addon.createObj());

try {
  console.log(addon.getArgs(1));
} catch (e) {
  console.log(e);
}

try {
  console.log(addon.getArgs(1, 1));
} catch (e) {
  console.log(e);
}

console.log(addon.getArgs(1, 'hello!!!!!!!!!!'));
