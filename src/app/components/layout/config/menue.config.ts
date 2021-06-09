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
                        }, {
                            title: 'About us',
                            page: '/about-us',
                            translate: 'MENU.ABOUT_US'
                        }, {
                            title: 'Contact us',
                            page: '/contact-us',
                            translate: 'MENU.CONTACT_US'
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
                }, {
                    title: 'E-Learning ',
                    page: '/',
                    translate: 'MENU.E_LEARNING',
                    submenu: [
                        {
                            title: 'Blogs',
                            page: '/e-learning/blogleft',
                            translate: 'MENU.BLOGS'
                        },
                        {
                            title: 'Training Packages',
                            page: '/training-packages',
                            translate: 'MENU.TRAINING_PACKAGES',
                            submenu: [
                                {
                                    title: 'Memory Sport',
                                    page: '/memory-sport',
                                    translate: 'MENU.MEMORY_SPORT'
                                },
                                {
                                    title: 'Memory Techniques',
                                    path: '/memory-techniques',
                                    translate: 'MENU.MEMORY_TECHNIQUES'
                                },
                                {
                                    title: 'Speed Reading',
                                    path: '/speed-reading',
                                    translate: 'MENU.SPEED_READING'
                                },
                                {
                                    title: 'Mind Mapping',
                                    path: '/mind-mapping',
                                    translate: 'MENU.MIND_MAPPING'
                                },
                                {
                                    title: 'Personal Growth',
                                    path: '/personal-growth',
                                    translate: 'MENU.PERSONAL_GROWTH'
                                },
                                {
                                    title: 'Critical Thinking',
                                    path: '/critical-thinking',
                                    translate: 'MENU.CRITICAL_THINKING'
                                },
                                {
                                    title: 'Public Speaking',
                                    path: '/public-speaking',
                                    translate: 'MENU.PUBLIC_SPEAKING'
                                },
                                {
                                    title: 'Management Skill',
                                    path: '/management-skill',
                                    translate: 'MENU.MANAGEMENT_SKILL'
                                }
                            ]
                        }, {
                            title: 'Motivational Videos',
                            page: '/motivational-videos',
                            translate: 'MENU.MOTIVATIONAL_VIDEOS'
                        }, {
                            title: 'Online Library',
                            page: '/online-library',
                            translate: 'MENU.ONLINE_LIBRARY'
                        },
                    ]
                }, {
                    title: 'Inventors Platform',
                    page: '/inventors-platform',
                    translate: 'MENU.INVENTORS_PLATFORM',
                    submenu: [
                        {
                            title: 'Inventions',
                            page: '/inventions',
                            translate: 'MENU.INVENTIONS'
                        }, {
                            title: 'Perilesional Expertise',
                            page: '/perilesional-expertise',
                            translate: 'MENU.PERILESIONAL_EXPERTISE'
                        }, {
                            title: 'Research',
                            page: '/research',
                            translate: 'MENU.RESEARCH'
                        }
                    ]
                }, {
                    title: 'Discussion Board',
                    page: '/discussion-board',
                    translate: 'MENU.DISCUSSION_BOARD',
                }, {
                    title: 'Ideas',
                    page: 'ideas',
                    translate: 'MENU.IDEAS',
                }, {
                    title: 'News & Opportunities',
                    page: '/news-opportunities',
                    translate: 'MENU.NEWS_OPPORTUNITIES',
                    submenu: [
                        {
                            title: 'Success Stories',
                            page: '/success-stories',
                            translate: 'MENU.SUCCESS_STORIES'
                        }, {
                            title: 'Job Opportunities',
                            page: '/job-opportunities',
                            translate: 'MENU.JOB_OPPORTUNITIES'
                        }, {
                            title: 'Scholarships',
                            page: '/scholarships',
                            translate: 'MENU.SCHOLARSHIPS'
                        }, {
                            title: 'Youth News',
                            page: '/youth-news',
                            translate: 'MENU.YOUTH_NEWS'
                        }
                    ]
                }, {
                    title: 'Complains & Questions',
                    page: '/complains-questions',
                    translate: 'MENU.COMPLAINS_QUESTIONS',
                    submenu: [
                        {
                            title: 'Complains',
                            page: '/complains',
                            translate: 'MENU.COMPLAINS'
                        }, {
                            title: 'Questions',
                            page: '/questions',
                            translate: 'MENU.QUESTIONS'
                        }
                    ]
                }, {
                    title: 'Surveys',
                    page: '/surveys',
                    translate: 'MENU.SURVEYS',
                }, {
                    title: 'YHC',
                    page: '/yhc',
                    translate: 'MENU.YHC',
                    submenu: [
                        {
                            title: 'Profile',
                            page: '/profile',
                            translate: 'MENU.PROFILE',
                            submenu: [
                                {
                                    title: 'Elected',
                                    page: '/elected',
                                    translate: 'MENU.ELECTED',

                                }, {
                                    title: 'Appointed',
                                    page: '/appointed',
                                    translate: 'MENU.APPOINTED'
                                }, {
                                    title: 'Honorary',
                                    page: '/honorary',
                                    translate: 'MENU.HONORARY'
                                }
                            ]

                        }, {
                            title: 'Election Registrations',
                            page: '/election-registrations',
                            translate: 'MENU.ELECTION_REGISTRATIONS',
                            submenu: [
                                {
                                    title: 'District',
                                    page: '/district',
                                    translate: 'MENU.DISTRICT',

                                }, {
                                    title: 'Provincial',
                                    page: '/provincial',
                                    translate: 'MENU.PROVINCIAL'
                                }, {
                                    title: 'Zonal',
                                    page: '/zonal',
                                    translate: 'MENU.ZONAL'
                                }
                            ]
                        }, {
                            title: 'Diaspora',
                            page: '/diaspora',
                            translate: 'MENU.DIASPORA',
                        }
                        , {
                            title: 'YHC Membership',
                            page: '/yhc-membership',
                            translate: 'MENU.YHC_MEMBERSHIP',
                        }
                    ]
                }, {
                    title: 'Deputy Ministry of Youth Affairs',
                    page: '/deputy-ministry-of-youth-affairs',
                    translate: 'MENU.DEPUTY_MINISTRY_OF_YOUTH_AFFAIRS',
                }


            ]
        }

    }

    public get configs(): any {
        this.defaults.header.items = this.prepareComponentsUrls(
            this.defaults.header.items
        );
        return this.defaults;
    }

    // Recursively add the parent's page url to the child's page url
    private prepareComponentsUrls(jObject, identifier = "") {
        return jObject.map((obj) => {
            if (obj.hasOwnProperty("page")) {
                obj.page = identifier + obj.page;
                if (obj.hasOwnProperty("submenu")) {
                    obj.submenu = this.prepareComponentsUrls(obj.submenu, obj.page);
                }
            }

            return obj;
        });
    }
}
