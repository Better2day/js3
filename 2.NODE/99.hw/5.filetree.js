// 리팩터링한 것 5.filetree-refactored.js에 몰아넣고 이 파일은 리팩토링 전 내용을 남겨두려고 했는데
// 편집 히스토리가 사라져서 5.filetree-refactored.js와 별 차이가 없게 되어버렸다. (혹시 몰라서 보관)

// 특정 디렉토리에서 시작해서 하위 디렉토리까지 전부 순회하면서 모든 파일과 디렉토리를 깊이에 맞게 출력하기
// 1. Base directory 지정
// 2. Base directory에 있는 파일과 디렉토리 모두 출력 (깊이는 1단계: 파일이나 디렉토리 앞에 ├── 선 출력 / 단, 마지막 항목이면 └──  출력)
// 3. 자식 디렉토리가 없으면 끝 / 있으면 그 디렉토리로 들어가서 2번 작업 반복 (단, 깊이는 2단계: │   ├── / 단, 부모가 마지막 폴더이면     ├── , 자식도 마지막이면      └── 출력)
// (디렉토리로 들어갈 때마다 선(나뭇가지) 문자열에 |    추가 // 자식은 그냥 자기가 끝인지만 구분해서 ├── 대신 └──만 출력하면 될 듯)
// 자식 디렉토리로 들어갈 필요가 있나? 그 디렉토리에 있는 파일과 디렉토리를 읽어오기만 하고, 다른 작업 등을 할 게 아니면 path만 변경해도 될 듯?

// Node.js Homepage 참고
// Class fs.Dir: A class representing a directory stream.
// dir.path → Type: <string>
// The read-only path of this directory as was provided to fs.opendir(), fs.opendirSync(), or fsPromises.opendir().

// Class fs.Dirent: A representation of a directory entry, which can be a file or a subdirectory within the directory,
//                  as returned by reading from an <fs.Dir>. The directory entry is a combination of the file name and file type pairs.
// dirent.isDirectory() → Returns: <boolean>
// dirent.isFile() → "
// dirent.name
// dirent.parentPath

// Class fs.Stats: provides information about a file.
// stats.isDirectory() "
// stats.isFile() "

const fs = require('fs');

// fs.opendir(path[, options], callback): Asynchronously open a directory
// fs.opendir('dir1', (err, dir) => {
//   console.log('opendir test');
//   console.log('dir: ', dir.path);
//   fs.readdir('dir1', (err, files) => {
//     if (err) {
//       console.log('디렉토리 읽기 오류');
//     }
//     files.forEach(file => console.log(file));
//   })
// });

// const basePath = './';
const basePath = '../../';
let currentPath = basePath;

function traverseTree(path, paramTree = '', depth = 0) {
  // try {
  const files = fs.readdirSync(path, { withFileTypes: true });


  files.forEach((file, idx) => {
    const isLastNode = idx == files.length - 1;
    const { totalBranch, treeAsAncestor } = makeBranch(paramTree, isLastNode, depth == 0);
    // 내 앞까지(조상~내 부모까지)의 나뭇가지 모양 출력 후 내 이름(파일명이나 디렉토리명) 출력
    console.log(totalBranch + file.name);

    if (file.isDirectory() && file.name != 'node_modules') {
      currentPath = currentPath + file.name + '/';
      // 자식 디렉토리에 대해서 다시 readdir 실행
      // console.log('자식 디렉토리 들어가기 전에, 내가 형제 디렉토리 중에 마지막인가?', idx == files.length);
      traverseTree(currentPath, treeAsAncestor, depth + 1);
      // 자식 디렉토리를 다 읽은 후에는 현재 경로를 원래대로(부모 디렉토리로) 복구
      currentPath = file.parentPath;
    }
  });
  // } catch (err) {
  //   console.log('※ Error: 디렉토리를 읽는 중 오류 발생');
  //   return -1;
  // }

}

// 본인 나뭇가지 모양 (같은 항렬에서 마지막 노드만 아래로 가는 선 없음)
// 부모로서의 나뭇가지 (자식 왼쪽 나뭇가지) 모양. 내가 같은 항렬에서 마지막 노드면, 자식 노드 나뭇가지를 그릴 때 자식 나뭇가지 왼쪽에 내 아래로 가는 선 없음)
function makeBranch(paramTree, isLastNode, isBasePath) {
  const lastBranch = (!isLastNode) ? '├── ' : '└── '; // 내가 내 항렬에서 마지막에 위치했는지에 따른 말단 가지 모양
  const totalBranch = (!isBasePath ? paramTree : '') + lastBranch; // 내 앞까지의 나뭇가지 모양 (조상~내 부모까지)
  // 자식 입장에서 조상들이 같은 항렬에서 마지막에 위치했는지 알기 어려우므로, 재귀 함수를 호출할 때 인자로 넘겨준다.
  const branchAsParent = (!isLastNode) ? '│   ' : '    '; // 내가 내 항렬에서 마지막에 위치했는지에 따른 부모 레벨에서의 가지 모양
  const treeAsAncestor = paramTree + branchAsParent; // 자식 디렉토리에게 넘겨줄 조상~부모(나)까지의 나뭇가지 모양
  return { totalBranch, treeAsAncestor };
}

traverseTree(basePath);
