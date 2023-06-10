import './App.css';
import {isArray, isEmpty} from 'lodash'

var Permissions = [
  {
    id: 'menu-first',
    title: 'First Menu',
    children: [
      {
        id: 'menu-first-c1',
        title: 'First Menu C1',
        children: [
          {
            id: 'menu-first-c1-c1',
            title: 'First Menu C1 C1',
          },
          {
            id: 'menu-first-c1-c2',
            title: 'First Menu C1 C2',
            children: [
              {
                id: 'menu-first-c1-c2-c1',
                title: 'First Menu C1 C2 C1',
                permission: false,
              },
              {
                id: 'menu-first-c1-c2-c2',
                title: 'First Menu C1 C2 C2',
                permission: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'menu-secound',
    title: 'Secound Menu',
  },
  {
    id: 'menu-third',
    title: 'Third Menu',
  },
]

function countTimesOfKey(arr, str) {
  return arr.filter((e, index) => {
    if (e.hasOwnProperty(str)) {
      e.children = countTimesOfKey(e.children, str)
    }
    if (isEmpty(e.children)) {
      delete e.children
    }
    return e.permission !== false
  })
}

function Data(props) {
  let value1 = props.value
  return (
    <>
      {
        Object.entries(value1).map(([key, value]) => {
          if (!isArray(value) && key !== 'id') {
            return (
              <li key={key}>
                {key}: {value}
              </li>
            )
          } else if (key === 'children') {
            return (
              <ul>
                {value.map((e) => (
                  <Data key={e.id} value={e} />
                ))}
              </ul>
            )
          }
          return true;
        }
        )}
    </>
  )
}

function App() {
  const get = countTimesOfKey(Permissions, 'children')
  // console.log('get', get)

  return (
    <>
      <ul>
        {get.map((e) => (
          <Data key={e.id} value={e} />
        ))}
      </ul>
    </>
  )
}

export default App;
