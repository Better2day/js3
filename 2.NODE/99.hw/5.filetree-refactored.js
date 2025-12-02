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

// const basePath = './';
const basePath = '../../';
let nextPath = basePath;

function traverseTree(paramPath, paramBranch = '', depth = 0) {
  try {
    // 자식 디렉토리를 만나면 자식 경로 순회를 마친 후에 같은 항렬의 나머지를 순회해야 하므로, 동기 함수 사용
    const files = fs.readdirSync(paramPath, { withFileTypes: true });

    files.forEach((file, index) => {
      const isLastNode = (index == (files.length - 1)); // [같은 항렬]에서 마지막 노드인지 여부
      const isBasePath = (depth == 0); // 순회할 디렉토리가 베이스 디렉토리인지 여부
      const { myTotalBranch, branchOfAncestor } = makeBranch(paramBranch, isLastNode, isBasePath);
      // 내 앞까지(조상~내 부모까지)의 나뭇가지 모양 출력 후 내 이름(파일명이나 디렉토리명) 출력
      console.log(myTotalBranch + file.name);

      if (file.isDirectory() && file.name != 'node_modules') {
        // 자식 디렉토리 경로명 생성
        nextPath = nextPath + file.name + '/';
        // 자식 디렉토리 경로에 대해서 readdir 실행. 조상~부모(나)까지의 나뭇가지 모양인 branchOfAncestor를 자식에게 넘겨줌
        traverseTree(nextPath, branchOfAncestor, depth + 1);
        // 자식 디렉토리를 다 읽은 후에는 다음 경로를 원래대로(내(부모) 디렉토리 경로로) 복구 (다른 자식이 남아있을 경우, 경로를 구하려면 내 경로부터 알아야 한다)
        nextPath = file.parentPath;
      }
    });
  } catch (err) {
    console.log('※ Error: 디렉토리를 읽는 중 오류 발생');
    return -1;
  }
}

// 나뭇가지 모양 결정 함수
// 본인 나뭇가지 모양: 같은 항렬에서 마지막 노드만 아래로 가는 선 없음
// 부모로서의 나뭇가지 (자식 왼쪽 나뭇가지) 모양: 내가 같은 항렬에서 마지막 노드면, 자식 노드 나뭇가지를 그릴 때 자식 나뭇가지 왼쪽에 내 아래로 가는 선 없음
// 자식 입장에서 조상이 각 항렬에서 마지막에 위치했는지 알기 어려우므로,
// 부모가 자식 디렉토리를 순회하기 위한 재귀 함수를 호출할 때 본인 항렬에서 마지막에 위치했는지 여부(isLastNode)를 인자로 넘겨준다.
function makeBranch(paramBranch, isLastNode, isBasePath) {
  const myDirectBranch = (!isLastNode) ? '├── ' : '└── '; // 내가 내 항렬에서 마지막에 위치했는지에 따른 말단 가지 모양
  const myTotalBranch = (!isBasePath ? paramBranch : '') + myDirectBranch; // 내 앞까지의 나뭇가지 모양 (Base Path가 아니면 조상~내 부모까지)
  const branchAsParent = (!isLastNode) ? '│   ' : '    '; // 내가 내 항렬에서 마지막에 위치했는지에 따른 부모로서의(부모 레벨에서의) 가지 모양
  const branchOfAncestor = paramBranch + branchAsParent; // 자식 디렉토리에게 넘겨줄 조상~부모(나)까지의 나뭇가지 모양
  return { myTotalBranch, branchOfAncestor };
}

traverseTree(basePath);
