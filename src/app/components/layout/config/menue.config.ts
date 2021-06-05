export class MenuConfig {
    public defaults: any = {
        header: {
            self: {},
            items: [
                {
                    title: 'Home',
                    page: '/home',
                    translate: 'MENU.HOME',
                    submenu: [
                        {
                            title: 'Vision',
                            page: '/vision',
                            translate: 'MENU.VISION'
                        },
                        {
                            title: 'Membership',
                            page: '/membership',
                            translate: 'MENU.MEMBERSHIP',
                            submenu: [
                                {
                                    title: 'Profile',
                                    page: '/profile',
                                    translate: 'MENU.PROFILE'
                                },
                                {
                                    title: 'Build Resume',
                                    path: '/build-resume',
                                    translate: 'MENU.BUILD_RESUME'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Home',
                    page: '/home',
                    translate: 'MENU.HOME',
                    submenu: [
                        {
                            title: 'Vision',
                            page: '/vision',
                            translate: 'MENU.VISION'
                        },
                        {
                            title: 'Membership',
                            page: '/membership',
                            translate: 'MENU.MEMBERSHIP',
                            submenu: [
                                {
                                    title: 'Profile',
                                    page: '/profile',
                                    translate: 'MENU.PROFILE'
                                },
                                {
                                    title: 'Build Resume',
                                    path: '/build-resume',
                                    translate: 'MENU.BUILD_RESUME'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Home',
                    page: '/home',
                    translate: 'MENU.HOME',
                    submenu: [
                        {
                            title: 'Vision',
                            page: '/vision',
                            translate: 'MENU.VISION'
                        },
                        {
                            title: 'Membership',
                            page: '/membership',
                            translate: 'MENU.MEMBERSHIP',
                            submenu: [
                                {
                                    title: 'Profile',
                                    page: '/profile',
                                    translate: 'MENU.PROFILE'
                                },
                                {
                                    title: 'Build Resume',
                                    path: '/build-resume',
                                    translate: 'MENU.BUILD_RESUME'
                                }
                            ]
                        }
                    ]
                }

            ]
        }

    }

    public get configs(): any {
        return this.defaults;
    }
}
