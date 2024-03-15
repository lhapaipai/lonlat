#!/bin/env python


def decode_polyline(polyline_str):
    index = 0
    coordinates = []
    lat = 0
    lng = 0

    while index < len(polyline_str):
        shift = 0
        result = 0

        while True:
            byte = ord(polyline_str[index]) - 63
            index += 1
            result |= (byte & 0x1F) << shift
            shift += 5
            if byte < 0x20:
                break

        dlat = ~(result >> 1) if result & 1 else (result >> 1)
        lat += dlat

        shift = 0
        result = 0

        while True:
            byte = ord(polyline_str[index]) - 63
            index += 1
            result |= (byte & 0x1F) << shift
            shift += 5
            if byte < 0x20:
                break

        dlng = ~(result >> 1) if result & 1 else (result >> 1)
        lng += dlng

        coordinates.append((lat / 100000.0, lng / 100000.0))

    return coordinates


# Chaîne encodée fournie
encoded_polyline = "chkiHuxhLDhABl@M@aARyAVkB^{Dz@Me@oBgIu@pBgAjDy@pCUl@IFO^GPCHIZK\\EZOFq@XOHJp@Lx@?TLx@H`@`@|BDVDVHd@BJXdBPr@Lb@DLPnARpANdAHr@Fn@TjBNx@N~AJv@Jr@H^Hb@Lj@H\\FTNb@Nf@PZNZT`@LRHLr@fAJ@dAnAv@~@|BnCrBbCj@n@\\\\\\Xd@^TLRJJDNH`@JRB^Fj@H^?fAGj@I~@SxCm@B?FAj@Kl@CdA@v@DdAPt@Tj@Tj@X\\P`CdAFBD@rAl@bCnA~@b@pAp@bAh@fAr@bAx@x@z@rBlCNRT\\jDfEz@bAh@r@Vb@\\j@p@xAr@bBr@~Ar@rADJJ@z@fAVVZ`@d@X^Pf@Pb@J`@Fb@?V?j@ALAb@A`@I^M^Mf@WTMROr@i@|@u@b@e@\\[t@mA`@c@\\a@^]TO`@UXKxBi@xDu@vE{@`Em@nEe@|DNvDf@fDz@hFxBfE`ClP|KrHzFvGpFnKdKbF`FnC`CtBxArBtAjBjAvBfAl`@fStCnAlAl@r@Zt@RxB`@xAPlBHjA?|CUnB]nDiAzBoA`DgCxBuBfA_Az@g@`Cw@dLqDTBXJVPJPHRBJBDFVDN@NAXCXAREXGPGNMRSRWLSBUAWIOSMUM[I]GWEo@A_@IwC?UE}@QuEMwBGyAGaACQUiDGgA]wDKeAUwBu@}GEQGOOoAg@_F]aCOOc@sF_@_F]gFkAwRKaBCe@IcAeA}QWyDCe@Gu@GmAGiAk@kJs@{Lq@{KEu@CUu@gMYaFQgCMmBScCYsCo@uFEWGe@Mw@YsBCS]kBCMm@iD{BsKu@mDi@eCiAsFy@{Dk@aDSuAQsAQyAKiAEo@UgDGgBGeBEwE?eC?mF@i@@iEDmIJiGFeC?K?GBoA?ADcBDiD@g@@mA@S@_@?EBoBDwC?YBkA@}@?YBgC@{@FsE@q@@cA?Q@cA@i@@{ABkA?]BkB@y@@sACcC?c@AWCiA?[AGAc@CUOyAG_@I_@I]CMISGOO]S_@i@q@uA}As@y@e@i@aBkB_@e@SSc@c@q@i@_Ao@{@i@i@Uk@Wk@Sg@O{@OmAWgEu@qB_@sAYc@Ok@UQKWM]WUQ][YYW[_@i@]o@Ug@[u@MYEOIUK_@Qo@Mo@Ms@K{@Gc@Ei@CYA_@CY?IAe@Ag@@aA@u@TsFDeAJuBFcBBwADgCF}C?YBgAFqD@s@AcDG_DEaCCsCA{AAqF?mBA_H?qAIkI@aEAoF@mAB}@DsAB_A@gA@c@?_EDs@@cA@o@Au@IwAWeF?i@Bi@@a@Dc@Fe@Jc@Nm@Rm@Ve@PYX_@n@q@bBcBRKPORWRGVIf@Ml@Il@Gl@Cb@?`AFb@F|AVnA\\hB^pATfALjAJlBR`CP@?jCNv@?VAb@E`AITCTCVEXETG~@Sd@M`@Sr@c@bAs@VSZY`AgA\\e@NSh@u@b@y@dA{B??LYPa@DOPm@T_AH[FSLk@VgALw@D]Fg@Fa@Ba@D_@Fq@D{@@a@H{B?S\\kOJwDB}@B_BBmA?s@Ai@Ck@Ae@Cq@Gy@Eg@Eo@CSq@gICm@C[Ag@Cc@Aa@?g@?oA@q@@w@Bo@@YDk@Fs@Dg@BUJ_AR_BNuAFe@NiAJk@Pw@Jc@Lk@J_@J_@bAiDNc@HYd@_BFOn@{Bb@sAz@sCv@iCv@gCb@yAn@qBz@sChAuD~AkFfAmD`ByEfAiDjAgDp@oB~AuEt@uB\\cAb@aBj@uBh@sC^uB\\wBl@uEt@cF@CBQDa@DWl@yEbA{HViB~AeL`C{PJ_AVgBbBcMFc@`AuHn@qEb@aD`@oC`B_Mp@yE`@iCJm@Jk@TiAF[nA_JtAiKb@sDDe@HaANqAJ{@L}@`@{C^kC\\gCb@eDx@aGT}Ad@mDDm@h@_ENiALmANoATqBLy@L_AHa@He@DSDMFUH[L]N_@N[Tc@Ta@hAiBZi@NYNYP_@LYN_@HYF]H[D[D[BW@U@U@Y@a@@W@S@]@Q@e@DaADkA?SZiNBsB@kB?c@?c@?yA?}AB}@?a@BaABeADoA@]DeAB}@@w@@_A?k@Aa@?KCe@G_AKy@UiAK_@Oi@M_@IUQo@Um@AGCEM_@Y}@Y_AOo@U}@Ou@Mq@SsAKmAI}@Cy@Au@?{@@c@Bg@Dg@B_@He@Jq@@ARaAV}@\\{@r@wAd@gAf@gAVy@ViAJs@Ho@Fy@FyAJoDJkDD}A??HyBNoE@y@@i@?g@?e@?_@AYAa@AYCWCWCWE]G_@Mk@Kg@IYU{@IWQi@Si@M_@Wq@]_ASq@Sq@Mg@g@uB]{Ag@yBi@_C_@gB_@eBYmAEQoAuFo@sCq@uCm@kCu@eDeAsE}@sDOo@a@eBWeAYyAQo@Uu@[}@Ys@KSMY_@s@Ug@We@OYYm@Q]S_@Q]Uc@Ym@We@[o@[m@[o@]s@We@_@u@We@Q_@[m@e@_Au@wA]s@]s@Qc@g@uA_@kAMg@Om@Sw@m@eC[uAMm@Oo@Qs@Ka@e@qB[sAOu@Ok@Gs@AOAQAW@S@U@EBOBOHSFOHMJKJKNGHCDCLEDALGLGNKNM\\]j@q@f@m@R]Ta@Ve@h@_Ah@sAlAqB~@{ArA{BjBcDtAkCp@yAj@qA`@cAb@kAh@}Ab@uAXcA|@gDz@oDh@gCb@uBXsAbAyFx@mFV_Bf@kDx@wFd@aDp@sE^gC\\{BXyBViBPcBN_BLyAL{AJaBDqADqA@m@?m@?u@?qAAo@CkACmAEkACiAA_AAo@?w@?eA?y@@kB?{A@wA@cA@w@Bs@Bq@@]FkAFeAF}@DaADcADeABiA?gB?kBAqBCkCKoMIuJEkGCkBKaM?mAAkF?{DDmEBuAFyCFcBDuAV}FBu@DoAFcBNw@PwD`@}GT_EHeBX_GJkCRoFLcD@YBq@@sAEo@Eo@Kk@Ig@Qs@EKOe@g@oAUi@MWGOISIWISAEESCSCUAWA[?QBeA@c@Bw@DgADuAD{A@m@DMBK@K@MAK?K?K?MAM?OAO?O@Q?QBMBM@KFMDQVe@PYXo@T_@^u@\\w@j@yA`@eA`AkCt@uBTm@L]DIR[p@iAFIP]P]NYTi@^_AJYh@yARe@l@{A`@gALGNYR]n@kAHO\\w@H[rAuCJWN[JOHIJKTWp@i@NK`@[PSJMrAgCd@}@Ta@Xa@HQJCJGLKHIFWFSDMDQFSNS~@oANUbBuBRYZ_@HMHMLMLONORQTUTQLMLOFMFODOH_@TgARmADYD[D]PsB@MDg@HcA^}DD[@QB_@DYRgATqA~BnAzBjAb@TPJLaCFsALsCDkADyCBoB?i@C}BGaECg@C}@GmAEkAAS@O?ODMHKJCDAF@bBJJ@"

print(decode_polyline(encoded_polyline))
