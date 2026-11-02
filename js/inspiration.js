/**
 * Modular Dedication & Vow Inspiration Library (语录与誓言灵感库)
 * Provides curated, atmospheric vows, clauses, and appraisals for 4 languages.
 */

const INSPIRATION_DATA = {
    'zh-CN': {
        categories: {
            pet: {
                name: '🐶 绝对忠犬 / 专属从属',
                desc: '自愿戴上项圈、剥夺反抗权能、随时摇尾乞怜与献身。',
                items: [
                    {
                        title: '永恒项圈宣誓',
                        type: 'vow',
                        text: '自愿戴上刻有主人名讳之金属项圈，剥夺一切人身反抗权能。从今往后，呼吸、心跳与感知皆为主人私产，随时随地摇尾乞怜，永不背弃。'
                    },
                    {
                        title: '犬化服从三则',
                        type: 'clause',
                        text: '1. 听见哨声或呼唤必须在3秒内双膝跪地、爬行至主人脚边领受指令。\n2. 未得许可不得直视主人双眼，受赐抚摸时须发出温顺呜咽。\n3. 无论身处何地，主人脚边永远是唯一的归宿与容身之所。'
                    },
                    {
                        title: '完全驯化评定',
                        type: 'assessment',
                        text: '【驯化评估合格】眼神清澈且完全臣服，反抗意志彻底归零。对项圈与牵引绳呈现出高度依赖与心理依附，评定为特级专属母犬玩物。'
                    },
                    {
                        title: '卑微专属自白',
                        type: 'vow',
                        text: '我是一只卑微无能、只知取悦主人的专属小狗。请主人狠狠握紧缰绳，不要把我丢弃在冰冷的现实里……汪！'
                    }
                ]
            },
            toy: {
                name: '💧 极度肉便器 / 完全开发',
                desc: '全身孔洞归属、随时接受内射与强制高潮、无条件奉献身体。',
                items: [
                    {
                        title: '通用母畜宣誓',
                        type: 'vow',
                        text: '自愿放弃作为人类之尊严与羞耻心，全身每一寸肌肤与敏感带全天候对主人开放。身体存在的唯一意义，即是作为盛装主人欲望与排泄的肉便器。'
                    },
                    {
                        title: '肉体使用许可条例',
                        type: 'clause',
                        text: '1. 所有孔洞全天候保持湿润、清洁与随时待命状态，无条件承受任意深度与时长的开发。\n2. 严禁未经允许擅自高潮；所有快感必须由主人亲自赐予或下令剥夺。\n3. 在被注入精华时须保持感激姿态，并清晰朗诵感恩词。'
                    },
                    {
                        title: '体质开发评定结论',
                        type: 'assessment',
                        text: '【身体深度开发完成】肉体敏感度已达极限阈值，触碰即颤抖湿润。精神羞耻防线完全崩解，彻底转化为依赖体液与肉体服从生存的高级肉便器。'
                    },
                    {
                        title: '堕落性奴自白',
                        type: 'vow',
                        text: '我的子宫与每一处孔洞都是主人的所有物。请主人不分昼夜、随时随地尽情使用我这具下贱贪欢的肉体……'
                    }
                ]
            },
            officer: {
                name: '👠 反差坠落 / 清冷长官',
                desc: '白天公安特异课清冷长官、夜间被特训驯服的羞耻反差契约。',
                items: [
                    {
                        title: '长官坠落誓约',
                        type: 'vow',
                        text: '特异课支配权能在此解除。脱下笔挺制服与冷峻威严，今夜在此间甘愿沦为主人脚下喘息颤抖的母狗。白天是万人敬畏的支配者，夜晚只是您的私有犬。'
                    },
                    {
                        title: '反差服从戒律',
                        type: 'clause',
                        text: '1. 执勤期间必须在制服下佩戴主人专属遥控装置，在例会上即使濒临失禁高潮亦不得失态发出声响。\n2. 任务汇报结束即刻锁门跪地，向主人献上鞋底亲吻礼仪。\n3. 凡因私自流露傲慢者，须在特异课档案室内领受捆绑调教。'
                    },
                    {
                        title: '支配者沦陷评估',
                        type: 'assessment',
                        text: '【外冷内媚特级档案】外表保持极高冷艳与长官威仪，但内在对调教与被支配呈现出病态亢奋。反差等级SSS，特批列为秘密最高专宠档案。'
                    },
                    {
                        title: '清冷求欢自白',
                        type: 'vow',
                        text: '长官的头衔与权柄……在主人面前全都是虚妄的饰品。请主人撕碎我最后的傲慢，将我彻底填满吧……'
                    }
                ]
            },
            rules: {
                name: '⚖️ 戒律惩诫 / 严格家法',
                desc: '失格惩罚、无条件绝对服从指令、彻底禁止个人隐私与谎言。',
                items: [
                    {
                        title: '绝对顺从天条',
                        type: 'vow',
                        text: '主人之言即为真理与律法。在任何境况下，对主人的指令不得迟疑、不得质问、不得辩解，第一反应须为绝对服从与执行。'
                    },
                    {
                        title: '戒律与惩诫总则',
                        type: 'clause',
                        text: '1. 任何形式的隐瞒、说谎或抗命，将立即处以吊缚、禁闭或剥夺高潮之惩诫。\n2. 个人私隐与日记彻底归公，所有社交与通讯全权接受主人无死角监视。\n3. 犯错后须自行脱光衣物奉上皮鞭，跪伏报数领罚。'
                    },
                    {
                        title: '品行规训结论',
                        type: 'assessment',
                        text: '【家法戒律考核通过】经过严格惩戒规训，任性与私欲已彻底磨灭。举止得体温顺，能深刻领会戒律威严并恪守本分。'
                    },
                    {
                        title: '受戒奉献词',
                        type: 'vow',
                        text: '痛苦与责罚亦是主人的恩宠。我愿在严苛的家法戒律中消磨一切劣根性，成为主人最无可挑剔的顺从杰作。'
                    }
                ]
            }
        }
    },
    'zh-TW': {
        categories: {
            pet: {
                name: '🐶 絕對忠犬 / 專屬從屬',
                desc: '自願戴上項圈、剝奪反抗權能、隨時搖尾乞憐與獻身。',
                items: [
                    {
                        title: '永恆項圈宣誓',
                        type: 'vow',
                        text: '自願戴上刻有主人名諱之金屬項圈，剝奪一切人身反抗權能。從今往後，呼吸、心跳與感知皆為主人私產，隨時隨地搖尾乞憐，永不背棄。'
                    },
                    {
                        title: '犬化服從三則',
                        type: 'clause',
                        text: '1. 聽見哨聲或呼喚必須在3秒內雙膝跪地、爬行至主人腳邊領受指令。\n2. 未得許可不得直視主人雙眼，受賜撫摸時須發出溫順嗚咽。\n3. 無論身處何地，主人腳邊永遠是唯一的歸宿與容身之所。'
                    },
                    {
                        title: '完全馴化評定',
                        type: 'assessment',
                        text: '【馴化評估合格】眼神清澈且完全臣服，反抗意志徹底歸零。對項圈與牽引繩呈現出高度依賴與心理依附，評定為特級專屬母犬玩物。'
                    },
                    {
                        title: '卑微專屬自白',
                        type: 'vow',
                        text: '我是一隻卑微無能、只知取悅主人的專屬小狗。請主人狠狠握緊韁繩，不要把我丟棄在冰冷的現實裡……汪！'
                    }
                ]
            },
            toy: {
                name: '💧 極度肉便器 / 完全開發',
                desc: '全身孔洞歸屬、隨時接受內射與強制高潮、無條件奉獻身體。',
                items: [
                    {
                        title: '通用母畜宣誓',
                        type: 'vow',
                        text: '自願放棄作為人類之尊嚴與羞恥心，全身每一寸肌膚與敏感帶全天候對主人開放。身體存在的唯一意義，即是作為盛裝主人欲望與排泄的肉便器。'
                    },
                    {
                        title: '肉體使用許可條例',
                        type: 'clause',
                        text: '1. 所有孔洞全天候保持濕潤、清潔與隨時待命狀態，無條件承受任意深度與時長的開發。\n2. 嚴禁未經允許擅自高潮；所有快感必須由主人親自賜予或下令剝奪。\n3. 在被注入精華時須保持感激姿態，並清晰朗誦感恩詞。'
                    },
                    {
                        title: '體質開發評定結論',
                        type: 'assessment',
                        text: '【身體深度開發完成】肉體敏感度已達極限閾值，觸碰即顫抖濕潤。精神羞恥防線完全崩解，徹底轉化為依賴體液與肉體服從生存的高級肉便器。'
                    },
                    {
                        title: '墮落性奴自白',
                        type: 'vow',
                        text: '我的子宮與每一處孔洞都是主人的所有物。請主人不分晝夜、隨時隨地盡情使用我這具下賤貪歡的肉體……'
                    }
                ]
            },
            officer: {
                name: '👠 反差墜落 / 清冷長官',
                desc: '白天公安特異課清冷長官、夜間被特訓馴服的羞恥反差契約。',
                items: [
                    {
                        title: '長官墜落誓約',
                        type: 'vow',
                        text: '特異課支配權能在此解除。脫下筆挺制服與冷峻威嚴，今夜在此間甘願淪為主人腳下喘息顫抖的母狗。白天是萬人敬畏的支配者，夜晚只是您的私有犬。'
                    },
                    {
                        title: '反差服從戒律',
                        type: 'clause',
                        text: '1. 執勤期間必須在制服下佩戴主人專屬遙控裝置，在例會上即使瀕臨失禁高潮亦不得失態發出聲響。\n2. 任務彙報結束即刻鎖門跪地，向主人獻上鞋底親吻禮儀。\n3. 凡因私自流露傲慢者，須在特異課檔案室內領受捆綁調教。'
                    },
                    {
                        title: '支配者淪陷評估',
                        type: 'assessment',
                        text: '【外冷內媚特級檔案】外表保持極高冷艷與長官威儀，但內在對調教與被支配呈現出病態亢奮。反差等級SSS，特批列為秘密最高專寵檔案。'
                    },
                    {
                        title: '清冷求歡自白',
                        type: 'vow',
                        text: '長官的頭銜與權柄……在主人面前全都是虛妄的飾品。請主人撕碎我最後的傲慢，將我徹底填滿吧……'
                    }
                ]
            },
            rules: {
                name: '⚖️ 戒律懲誡 / 嚴格家法',
                desc: '失格懲罰、無條件絕對服從指令、徹底禁止個人隱私與謊言。',
                items: [
                    {
                        title: '絕對順從天條',
                        type: 'vow',
                        text: '主人之言即為真理與律法。在任何境況下，對主人的指令不得遲疑、不得質問、不得辯解，第一反應須為絕對服從與執行。'
                    },
                    {
                        title: '戒律與懲誡總則',
                        type: 'clause',
                        text: '1. 任何形式的隱瞞、說謊或抗命，將立即處以吊縛、禁閉或剝奪高潮之懲誡。\n2. 個人私隱與日記徹底歸公，所有社交與通訊全權接受主人無死角監視。\n3. 犯錯後須自行脫光衣物奉上皮鞭，跪伏報數領罰。'
                    },
                    {
                        title: '品行規訓結論',
                        type: 'assessment',
                        text: '【家法戒律考核通過】經過嚴格懲戒規訓，任性與私欲已徹底磨滅。舉止得體溫順，能深刻領會戒律威嚴並恪守本分。'
                    },
                    {
                        title: '受戒奉獻詞',
                        type: 'vow',
                        text: '痛苦與責罰亦是主人的恩寵。我願在嚴苛的家法戒律中消磨一切劣根性，成為主人最無可挑剔的順從傑作。'
                    }
                ]
            }
        }
    },
    'en': {
        categories: {
            pet: {
                name: '🐶 Loyal Pet / Dedicated Submission',
                desc: 'Voluntary collaring, total forfeiture of resistance, unconditional adoration at Master\'s feet.',
                items: [
                    {
                        title: 'Eternal Collar Vow',
                        type: 'vow',
                        text: 'I voluntarily surrender all autonomy to wear this engraved metal collar. From this day forward, my breath, heartbeat, and senses are Master\'s absolute property, eternally kneeling and obedient.'
                    },
                    {
                        title: 'Three Pet Ordinances',
                        type: 'clause',
                        text: '1. Upon hearing Master\'s call, kneel and crawl to Master\'s feet within 3 seconds.\n2. Never make direct eye contact without permission; whimper softly with gratitude when petted.\n3. Master\'s side is my only home, sanctuary, and purpose in this universe.'
                    },
                    {
                        title: 'Domestication Certification',
                        type: 'assessment',
                        text: '[DOMESTICATION VERIFIED] Complete psychological surrender with zero rebellious impulse. Highly dependent on leash guidance and verbal affirmation. Certified as supreme personal pet.'
                    },
                    {
                        title: 'Humble Pet Devotion',
                        type: 'vow',
                        text: 'I am nothing more than a helpless, devoted little puppy living solely for Master\'s pleasure. Please hold my leash tight and never abandon me... Woof!'
                    }
                ]
            },
            toy: {
                name: '💧 Extreme Toy / Complete Surrender',
                desc: 'Full bodily availability, unconditional release of bodily fluids, total sexual indenture.',
                items: [
                    {
                        title: 'Universal Toy Dedication',
                        type: 'vow',
                        text: 'I willingly relinquish all mortal dignity and shame. Every inch of my flesh and intimate receptors is accessible to Master 24/7, existing solely to receive Master\'s desire.'
                    },
                    {
                        title: 'Physical Usage Guidelines',
                        type: 'clause',
                        text: '1. All orifices must remain clean, primed, and available for any depth and duration of inspection.\n2. Climaxes are strictly forbidden unless explicitly commanded and granted by Master.\n3. Maintain posture of profound gratitude while being filled and clearly recite thank-you prayers.'
                    },
                    {
                        title: 'Sensory Conditioning Report',
                        type: 'assessment',
                        text: '[CONDITIONING COMPLETE] Bodily sensitivity heightened to critical threshold. Mental barriers thoroughly disassembled. Certified as high-grade responsive pleasure indenture.'
                    },
                    {
                        title: 'Sensual Slave Vow',
                        type: 'vow',
                        text: 'My body belongs entirely to Master. Day or night, anywhere and anytime, please use this shameless, willing flesh to your absolute satisfaction.'
                    }
                ]
            },
            officer: {
                name: '👠 Fallen Dignity / Officer Fall',
                desc: 'Elite commanding officer by daylight, shivering collared pet in private quarters.',
                items: [
                    {
                        title: 'Officer Fall Oath',
                        type: 'vow',
                        text: 'Division command powers hereby revoked. Stripping away the sharp uniform and haughty authority, tonight I collapse into Master\'s trembling pet. An elite officer in public, but only Master\'s possession behind closed doors.'
                    },
                    {
                        title: 'Duality Discipline Directives',
                        type: 'clause',
                        text: '1. Remote control device must be worn beneath uniform during all high-level briefings without flinching.\n2. Lock door and kneel instantly upon completing reports to kiss Master\'s shoe tips.\n3. Any hint of lingering arrogance shall be disciplined with suspension binding in the secure archives.'
                    },
                    {
                        title: 'Commander Indenture Evaluation',
                        type: 'assessment',
                        text: '[CONFIDENTIAL DOSSIER] Displays stern authority outwardly while possessing deep psychological craving for absolute submission. Fall Rating: SSS. Classified Top Secret.'
                    },
                    {
                        title: 'Dignity Broken Confession',
                        type: 'vow',
                        text: 'Ranks and medals are meaningless before Master. Tear away my remaining pride and possess me entirely...'
                    }
                ]
            },
            rules: {
                name: '⚖️ Discipline / Absolute Rules',
                desc: 'Penalties for infractions, unquestioning obedience, zero secrecy or privacy.',
                items: [
                    {
                        title: 'Supreme Law of Obedience',
                        type: 'vow',
                        text: 'Master\'s word is the supreme truth and law. In all circumstances, commands must be carried out instantly without hesitation, questioning, or dispute.'
                    },
                    {
                        title: 'Code of Penal Discipline',
                        type: 'clause',
                        text: '1. Any deceit, concealment, or hesitation incurs immediate binding, isolation, or orgasm denial.\n2. Personal journals and communications are subject to unannounced inspection at any hour.\n3. Upon committing an error, immediately strip, present the crop, and count each stroke aloud.'
                    },
                    {
                        title: 'Discipline Audit Finding',
                        type: 'assessment',
                        text: '[HOUSE RULES AUDIT: PASSED] Selfish impulses eliminated through rigorous disciplinary training. Modest, attentive, and reverent toward household statutes.'
                    },
                    {
                        title: 'Devout Submission Offering',
                        type: 'vow',
                        text: 'Pain and chastisement are blessings from Master\'s hand. Under this strict discipline, I become your flawlessly compliant masterpiece.'
                    }
                ]
            }
        }
    },
    'ja': {
        categories: {
            pet: {
                name: '🐶 忠実な愛犬 / 専属従属',
                desc: '首輪の受容、抵抗権の全面放棄、ご主人様の足元での絶対的服従。',
                items: [
                    {
                        title: '永遠の首輪宣誓',
                        type: 'vow',
                        text: 'ご主人様のお名前が刻印された首輪を自ら受け入れ、すべての抵抗権を放棄します。呼吸も心拍もすべてご主人様の私有物であり、永遠にお傍でかしこまります。'
                    },
                    {
                        title: '愛犬服従三か条',
                        type: 'clause',
                        text: '1. 呼び鈴または声が聞こえたら3秒以内に膝をつき、足元まで這い寄ること。\n2. 許可なくご主人様の瞳を見つめてはならず、撫でられた際は甘えた声を出すこと。\n3. ご主人様の足元こそが、世界で唯一の帰るべき居場所であること。'
                    },
                    {
                        title: '完全飼育評価書',
                        type: 'assessment',
                        text: '【調教判定：合格】反抗意志は完全に消失。首輪とリードに対する強い心理的依存を確認。特級専属雌犬玩物として正式認定。'
                    },
                    {
                        title: '卑屈な愛犬の告白',
                        type: 'vow',
                        text: '私はご主人様を喜ばせることしかできない無力な仔犬です。リードを強く握り締め、冷たい世界に放り出さないでください……ワン！'
                    }
                ]
            },
            toy: {
                name: '💧 肉便器 / 完全開発',
                desc: '全身の器官の無条件開放、強制絶頂の受容、恥情の全面放棄。',
                items: [
                    {
                        title: '専用母畜宣誓',
                        type: 'vow',
                        text: '人間としての尊厳と羞恥心を捨て去り、全身の隅々までご主人様に捧げます。私の肉体が存在する唯一の意義は、ご主人様の欲望を受け止める器となることです。'
                    },
                    {
                        title: '肉体使用許可規程',
                        type: 'clause',
                        text: '1. 全身の孔は常に清潔かつ準備完了の状態を保ち、無条件で命令を受け入れること。\n2. 許可なき絶頂は固く禁ずる。すべての快楽はご主人様より下賜されるものとする。\n3. 注ぎ込まれた際は感謝の姿勢を崩さず、明確に感謝の言葉を述べること。'
                    },
                    {
                        title: '開発鑑定結論',
                        type: 'assessment',
                        text: '【身体深層開発完了】触れるだけで身悶えする極上の敏感体質へと変貌。羞恥心の防壁は完全に崩壊し、高機能肉便器として完成。'
                    },
                    {
                        title: '堕落性奴の自白',
                        type: 'vow',
                        text: '私の身体のすべてはご主人様のもの。昼夜を問わず、いつでもどこでもこの卑しい肉体を好きなだけ使い尽くしてください……'
                    }
                ]
            },
            officer: {
                name: '👠 尊厳の陥落 / 冷徹長官',
                desc: '昼は公安特異課の冷酷な指揮官、夜は膝元で震える牝犬への劇的反差。',
                items: [
                    {
                        title: '長官陥落の誓約',
                        type: 'vow',
                        text: '特異課の支配権能をここに解除します。冷徹な制服を脱ぎ捨て、今宵はご主人様の足元で喘ぐ雌犬へと堕ちます。昼の威厳は、夜の絶対的快楽の生贄です。'
                    },
                    {
                        title: '二重生活の戒律',
                        type: 'clause',
                        text: '1. 任務中も制服の下に遠隔装置を装着し、定例会議中も声を漏らさず耐えること。\n2. 報告完了後は即座に施錠して膝をつき、靴先へ口づけの礼を捧げること。\n3. 傲慢な態度が漏れた場合は、特異課地下資料室にて緊縛調教に服すること。'
                    },
                    {
                        title: '支配者陥落鑑定',
                        type: 'assessment',
                        text: '【極秘檔案：S級反差】外見は冷厳そのものだが、内面は支配されることに異常な快感を覚える異常体質。特異課最高機密として保護。'
                    },
                    {
                        title: '清冷なる懇願',
                        type: 'vow',
                        text: '階級も肩書きも……ご主人様の前では無意味な飾りです。どうか私の最後の誇りを粉々に砕いてください……'
                    }
                ]
            },
            rules: {
                name: '⚖️ 厳格戒律 / 家法規訓',
                desc: '失格時の厳罰、疑念なき絶対服従、プライバシーと嘘の完全剥奪。',
                items: [
                    {
                        title: '絶対服従の至上命題',
                        type: 'vow',
                        text: 'ご主人様のお言葉こそが世界の法であり真理。いかなる時も躊躇せず、反論せず、言い訳をせず、ただひたすらに服従を遂行します。'
                    },
                    {
                        title: '賞罰および規律総則',
                        type: 'clause',
                        text: '1. 虚偽や命令違反は即座に吊り縛り・絶頂禁止の厳罰に処す。\n2. 通信や個人記録はすべて開示し、24時間の監視を受容すること。\n3. 過ちを犯した際は自ら衣服を脱いで鞭を差し出し、回数を数えて受刑すること。'
                    },
                    {
                        title: '規律審査合格証',
                        type: 'assessment',
                        text: '【家法査定：満点】厳格な規訓により我欲と傲慢を完全に排除。礼節と慎みを弁えた、完全なる従順の傑作と認定する。'
                    },
                    {
                        title: '受戒の祈り',
                        type: 'vow',
                        text: '戒律の痛みすらもご主人様の愛の証。この厳格な規律の中で、私はご主人様だけの忠実な芸術品となります。'
                    }
                ]
            }
        }
    }
};

let currentInspirationTargetId = null;
let currentInspirationCategory = 'pet';

/**
 * Open Inspiration Modal for a given input element ID
 */
function openInspirationModal(targetInputId) {
    currentInspirationTargetId = targetInputId;
    const modal = document.getElementById('inspiration-modal');
    if (!modal) return;

    // Show modal
    modal.classList.remove('hidden');

    // Update target field indicator
    const targetIndicator = document.getElementById('inspire-target-name');
    if (targetIndicator) {
        const inputEl = document.getElementById(targetInputId);
        let fieldName = targetInputId;
        if (inputEl) {
            const parentBlock = inputEl.closest('div');
            const labelEl = parentBlock ? parentBlock.querySelector('label') : null;
            if (labelEl) fieldName = labelEl.innerText.replace(/[*:]/g, '').trim();
        }
        targetIndicator.innerText = fieldName;
    }

    renderInspirationCategories();
    renderInspirationItems();

    trackEvent('open_inspiration_modal', { target_field: targetInputId });
}

/**
 * Close Inspiration Modal
 */
function closeInspirationModal() {
    const modal = document.getElementById('inspiration-modal');
    if (modal) modal.classList.add('hidden');
    currentInspirationTargetId = null;
}

/**
 * Switch Active Inspiration Category
 */
function switchInspirationCategory(catKey) {
    currentInspirationCategory = catKey;
    renderInspirationCategories();
    renderInspirationItems();
}

/**
 * Render Category Tabs according to current language
 */
function renderInspirationCategories() {
    const lang = (typeof currentLang !== 'undefined' && INSPIRATION_DATA[currentLang]) ? currentLang : 'zh-CN';
    const catContainer = document.getElementById('inspire-cat-tabs');
    if (!catContainer) return;

    const categories = INSPIRATION_DATA[lang].categories;
    catContainer.innerHTML = Object.entries(categories).map(([key, cat]) => {
        const isActive = (key === currentInspirationCategory);
        const activeClass = isActive
            ? 'bg-amber-500 text-black shadow-md font-black'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white font-bold';
        return `
            <button type="button" onclick="switchInspirationCategory('${key}')"
                class="px-3 py-2 rounded-xl text-xs transition flex items-center gap-1.5 whitespace-nowrap shrink-0 ${activeClass}">
                ${escapeHtml(cat.name)}
            </button>
        `;
    }).join('');

    const descEl = document.getElementById('inspire-cat-desc');
    if (descEl && categories[currentInspirationCategory]) {
        descEl.innerText = categories[currentInspirationCategory].desc;
    }
}

/**
 * Render Inspiration Items for current active category
 */
function renderInspirationItems() {
    const lang = (typeof currentLang !== 'undefined' && INSPIRATION_DATA[currentLang]) ? currentLang : 'zh-CN';
    const listContainer = document.getElementById('inspire-item-list');
    if (!listContainer) return;

    const cat = INSPIRATION_DATA[lang].categories[currentInspirationCategory];
    if (!cat || !cat.items) return;

    const applyBtnText = (typeof t === 'function') ? t('btn_inspire_apply') : '填入此句 ➔';

    listContainer.innerHTML = cat.items.map((item, idx) => {
        const typeBadge = item.type === 'vow'
            ? '<span class="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 py-0.5 rounded font-mono">宣誓</span>'
            : item.type === 'clause'
                ? '<span class="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1.5 py-0.5 rounded font-mono">条款</span>'
                : '<span class="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded font-mono">批注</span>';

        return `
            <div class="bg-gray-900/90 border border-gray-800 hover:border-amber-500/60 rounded-xl p-3.5 space-y-2.5 transition group">
                <div class="flex items-center justify-between gap-2 border-b border-gray-800/80 pb-1.5">
                    <div class="flex items-center gap-2">
                        ${typeBadge}
                        <span class="text-xs font-bold text-gray-200 group-hover:text-amber-300 transition">${escapeHtml(item.title)}</span>
                    </div>
                    <button type="button" onclick="applyInspirationByIndex(${idx})"
                        class="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-[11px] px-2.5 py-1 rounded-lg transition shadow flex items-center gap-1 shrink-0">
                        <span>✍️</span> <span>${applyBtnText}</span>
                    </button>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-line select-text">${escapeHtml(item.text)}</p>
            </div>
        `;
    }).join('');
}

/**
 * Apply selected inspiration item by index
 */
function applyInspirationByIndex(idx) {
    const lang = (typeof currentLang !== 'undefined' && INSPIRATION_DATA[currentLang]) ? currentLang : 'zh-CN';
    const cat = INSPIRATION_DATA[lang].categories[currentInspirationCategory];
    if (!cat || !cat.items || !cat.items[idx]) return;

    applyInspirationText(cat.items[idx].text);
}

/**
 * Apply text to current target input element
 */
function applyInspirationText(text) {
    if (!currentInspirationTargetId) return;
    const targetEl = document.getElementById(currentInspirationTargetId);
    if (!targetEl) return;

    const appendMode = document.getElementById('inspire-mode-append')?.checked || false;

    if (appendMode && targetEl.value.trim().length > 0) {
        targetEl.value = targetEl.value.trim() + '\n' + text;
    } else {
        targetEl.value = text;
    }

    // Trigger specific update logic based on target input ID
    const id = currentInspirationTargetId;
    if (id === 'sc-in-quote') {
        updateScField('quote');
        triggerAutosave('slave');
    } else if (id === 'sc-in-kinks') {
        updateScField('kinks');
        triggerAutosave('slave');
    } else if (id === 'sc-in-oath') {
        updateScField('oath');
        triggerAutosave('slave');
    } else if (id === 'sc-in-terms') {
        updateScField('terms');
        triggerAutosave('slave');
    } else if (id === 'bbc-in-footer-slogan') {
        updateBbcField('footer-slogan');
        triggerAutosave('bbc');
    } else if (id === 'bbc-in-declaration') {
        updateBbcField('declaration');
        triggerAutosave('bbc');
    } else if (id === 'cert-in-terms') {
        updateCertTerms();
        triggerAutosave('cert');
    } else if (id === 'cert-in-assessment') {
        updateCertField('assessment');
        triggerAutosave('cert');
    } else if (id === 'cert-in-declaration') {
        updateCertField('declaration');
        triggerAutosave('cert');
    } else if (id === 'bimbo-in-rules') {
        updateBimboRules();
        triggerAutosave('bimbo');
    } else if (id === 'bimbo-in-stamp-text') {
        updateBimboField('stamp-text');
        triggerAutosave('bimbo');
    }

    // Provide visual feedback
    const toastMsg = (typeof t === 'function')
        ? t('toast_inspire_applied')
        : '💡 灵感文案已成功填入！';
    if (typeof showToast === 'function') {
        showToast(toastMsg, 2500);
    }

    trackEvent('apply_inspiration', {
        target_field: currentInspirationTargetId,
        category: currentInspirationCategory
    });

    closeInspirationModal();
}
