export default [
    {
        path: '/home',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./home'))
            })
        }
    },
    {
        path: '/source/case-list',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/case/CaseList.jsx'))
            })
        }
    },
    // {
    //     path: '/source/recent-table',
    //     getComponent: (location, cb) => {
    //         require.ensure([], (require) => {
    //             cb(null, require('./source/table-demo/RecentTable.jsx'))
    //         })
    //     }
    // },
    {
        path: '/source/info-card-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/info-card-demo/InfoCardDemo.jsx'))
            })
        }
    },
    {
        path: '/source/upload-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/upload-demo/UploadDemo.jsx'))
            })
        }
    },
    {
        path: '/source/interface-list',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/interface/InterfaceList.jsx'))
            })
        }
    },
    {
        path: '/source/interface-add',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/interface/InterfaceAdd'))
            })
        }
    },
    {
        path: '/source/interface-task-list',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/interface/InterfaceTaskList'))
            })
        }
    },
    {
        path: '/source/interface-detail/:entry',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/interface/InterfaceDetail'))
            })
        }
    },
    {
        path: '/source/interface-task-detail/:entry',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./source/interface/InterfaceTaskDetail'))
            })
        }
    },



    //404
    {
        path: '/404',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./not-found'))
            })
        }
    }
]
