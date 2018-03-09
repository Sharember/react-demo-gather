import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'java',
  icon: 'dashboard',
  path: 'home1',
  children: [{
    name: 'java1',
    path: 'home2',
  }, {
    name: 'java2',
    path: 'home3',
  }, {
    name: 'java3',
    path: 'home4',
    // hideInMenu: true,
  }],
}, {
  name: 'linux',
  icon: 'form',
  path: 'form5',
  children: [{
    name: 'linux1',
    path: 'home6',
  }, {
    name: 'linux2',
    path: 'home7',
  }, {
    name: 'linux3',
    path: 'home8',
    children: [{
      name: 'linux3-1',
      path: 'home9',
    }, {
      name: 'linux3-2',
      path: 'home0',
    }, {
      name: 'linux3-3',
      path: 'homex',
    }],
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
