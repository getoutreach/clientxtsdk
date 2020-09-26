export declare type AllContextKeys = UserContextKeys |
                                     AccountContextKeys |
                                     OpportunityContextKeys

export declare type UserContextKeys =
    'usr.id' |
    'usr.email' |
    'usr.fname' |
    'usr.lname' |
    'usr.title' |
    'usr.usrname' |
    'usr.csf1' | 'usr.csf2' | 'usr.csf3' | 'usr.csf4' | 'usr.csf5';

export declare type AccountContextKeys =
    'acc.id' |
    'acc.cstmId' |
    'acc.desc' |
    'acc.loc' |
    'acc.name' |
    'acc.tags' |
    'acc.csf1'  | 'acc.csf2'  | 'acc.csf3'  | 'acc.csf4'  | 'acc.csf5'  | 'acc.csf6'  | 'acc.csf7' | 'acc.csf8' | 'acc.csf9' |
    'acc.csf10' | 'acc.csf11' | 'acc.csf12' | 'acc.csf13' | 'acc.csf14' | 'acc.csf15' | 'acc.csf16' | 'acc.csf17' | 'acc.csf18' | 'acc.csf19' | 'acc.csf20' |
    'acc.csf20' | 'acc.csf21' | 'acc.csf22' | 'acc.csf23' | 'acc.csf24' | 'acc.csf25' | 'acc.csf26' | 'acc.csf27' | 'acc.csf28' | 'acc.csf29' | 'acc.csf20' |
    'acc.csf30' | 'acc.csf31' | 'acc.csf32' | 'acc.csf33' | 'acc.csf34' | 'acc.csf35' | 'acc.csf36' | 'acc.csf37' | 'acc.csf38' | 'acc.csf39' | 'acc.csf20' |
    'acc.csf40' | 'acc.csf41' | 'acc.csf42' | 'acc.csf43' | 'acc.csf44' | 'acc.csf45' | 'acc.csf46' | 'acc.csf47' | 'acc.csf48' | 'acc.csf49' | 'acc.csf20' |
    'acc.csf50' | 'acc.csf51' | 'acc.csf52' | 'acc.csf53' | 'acc.csf54' | 'acc.csf55' | 'acc.csf56' | 'acc.csf57' | 'acc.csf58' | 'acc.csf59' | 'acc.csf20' |
    'acc.csf60' | 'acc.csf61' | 'acc.csf62' | 'acc.csf63' | 'acc.csf64' | 'acc.csf65' | 'acc.csf66' | 'acc.csf67' | 'acc.csf68' | 'acc.csf69' | 'acc.csf20' |
    'acc.csf70' | 'acc.csf71' | 'acc.csf72' | 'acc.csf73' | 'acc.csf74' | 'acc.csf75' | 'acc.csf76' | 'acc.csf77' | 'acc.csf78' | 'acc.csf79' | 'acc.csf20' |
    'acc.csf80' | 'acc.csf81' | 'acc.csf82' | 'acc.csf83' | 'acc.csf84' | 'acc.csf85' | 'acc.csf86' | 'acc.csf87' | 'acc.csf88' | 'acc.csf89' | 'acc.csf20' |
    'acc.csf90' | 'acc.csf91' | 'acc.csf92' | 'acc.csf93' | 'acc.csf94' | 'acc.csf95' | 'acc.csf96' | 'acc.csf97' | 'acc.csf98' | 'acc.csf199' | 'acc.csf100'

export declare type OpportunityContextKeys =

    'opp.amnt' |
    'opp.desc' |
    'opp.extCreatedAt' |
    'opp.id' |
    'opp.name' |
    'opp.nextStep' |
    'opp.oppType' |
    'opp.probability' |
    'opp.tags' |
    'opp.csf1'  | 'opp.csf2'  | 'opp.csf3'  | 'opp.csf4'  | 'opp.csf5'  | 'opp.csf6'  | 'opp.csf7' | 'opp.csf8' | 'opp.csf9' |
    'opp.csf10' | 'opp.csf11' | 'opp.csf12' | 'opp.csf13' | 'opp.csf14' | 'opp.csf15' | 'opp.csf16' | 'opp.csf17' | 'opp.csf18' | 'opp.csf19' | 'opp.csf20' |
    'opp.csf20' | 'opp.csf21' | 'opp.csf22' | 'opp.csf23' | 'opp.csf24' | 'opp.csf25' | 'opp.csf26' | 'opp.csf27' | 'opp.csf28' | 'opp.csf29' | 'opp.csf20' |
    'opp.csf30' | 'opp.csf31' | 'opp.csf32' | 'opp.csf33' | 'opp.csf34' | 'opp.csf35' | 'opp.csf36' | 'opp.csf37' | 'opp.csf38' | 'opp.csf39' | 'opp.csf20' |
    'opp.csf40' | 'opp.csf41' | 'opp.csf42' | 'opp.csf43' | 'opp.csf44' | 'opp.csf45' | 'opp.csf46' | 'opp.csf47' | 'opp.csf48' | 'opp.csf49' | 'opp.csf20' |
    'opp.csf50' | 'opp.csf51' | 'opp.csf52' | 'opp.csf53' | 'opp.csf54' | 'opp.csf55' | 'opp.csf56' | 'opp.csf57' | 'opp.csf58' | 'opp.csf59' | 'opp.csf20' |
    'opp.csf60' | 'opp.csf61' | 'opp.csf62' | 'opp.csf63' | 'opp.csf64' | 'opp.csf65' | 'opp.csf66' | 'opp.csf67' | 'opp.csf68' | 'opp.csf69' | 'opp.csf20' |
    'opp.csf70' | 'opp.csf71' | 'opp.csf72' | 'opp.csf73' | 'opp.csf74' | 'opp.csf75' | 'opp.csf76' | 'opp.csf77' | 'opp.csf78' | 'opp.csf79' | 'opp.csf20' |
    'opp.csf80' | 'opp.csf81' | 'opp.csf82' | 'opp.csf83' | 'opp.csf84' | 'opp.csf85' | 'opp.csf86' | 'opp.csf87' | 'opp.csf88' | 'opp.csf89' | 'opp.csf20' |
    'opp.csf90' | 'opp.csf91' | 'opp.csf92' | 'opp.csf93' | 'opp.csf94' | 'opp.csf95' | 'opp.csf96' | 'opp.csf97' | 'opp.csf98' | 'opp.csf99' | 'opp.csf100'
