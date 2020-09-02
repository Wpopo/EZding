import React from 'react';
import Link from 'next/link';
import { FooterWrapper , Clearfix} from '../../styled/commonStyled';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import PopUpContent from '../common/popUpContent';
//instead images


class Footer extends React.Component {
	constructor(props){
		super(props);

		this.popUpOpen = this.popUpOpen.bind(this)
		this.showUi = this.showUi.bind(this);

		this.state = {
			visiblePopUp: false,
			item:''
		}
	}

	popUpOpen(item){

		if(this.state.visiblePopUp === false){
			this.setState({
				visiblePopUp:true,
				item
			},()=>{
				//取消上層的scrollbar
				document.querySelectorAll("body")[0].style.overflowY = "hidden";
			});
		}else{
			this.setState({
				visiblePopUp:false
			},()=>{
				document.querySelectorAll("body")[0].style.overflowY = "scroll";
			});
		}
	}

	//show fotter 隱私權條款，會員條款，反詐騙宣導
	showUi(){

		if(this.state.item === "privacy"){
			return(
				<div className="footerPopUpWrapper">
					<div id="idNameFooterPopUp" className="privacy">
						<div className="title">
							<h1>隱私權聲明</h1>
						</div>
						<div className="content">
							<ul>
								<li>我們瞭解在線上訂票需要您對我們有極大的信任。我們非常重視這份信任。本「隱私權聲明」說明我們將如何使用您透過富爾特科技股份有限公司所擁有及營運的 ez訂網站 (ezding.com.tw) 網站提供的資料。</li>
								<li>請注意，本「隱私權聲明」是我們網站與所提供服務中不可缺少的一部分，不得以任何方式從使用條款和條件中分離開，也不得從會員資格、使用或交易處理程序中分離開。為幫助您瞭解本網站如何蒐集、處理及利用您所提供的個人資料以及您就個人資料所享有的權利，請詳細閱讀本隱私權聲明。一旦透過您在本網站提供資訊，即表示您接受本「隱私權聲明」中所說明的規則。如您不同意本隱私權聲明者，請立即停止使用本網站服務，已聲請會員帳號者並請立即刪除帳號，感謝您的配合。</li>
							</ul>

							<div className="heading">
								<p>資訊收集與使用：</p>
							</div>

							<ul>
								<li>會員註冊<br />ezding.com.tw 可供您註冊帳號以成為會員。當您選擇成為 ez訂網站 (ezding.com.tw) 會員時，我們需要您提供特定資訊，並要求您依照個人意願提供其他資訊。如果您不向我們提供必要的資訊，將無法在我們網站上擁有帳號，亦無法成為 ez訂網站 (ezding.com.tw) 會員。我們需要或要求的資訊至少包括您的姓名、行動電話號碼、電子郵件地址、密碼與密碼確認。透過註冊表單收集這些資訊的原因包括：(1) 進行個人身份識別； (2) 讓我們在必要時能聯絡您以便提供客戶服務；(3) 調整我們網站內容以符合您的獨特需求；以及 (4) 進行並改善我們網站所提供的服務。此外，收集您的電子郵件將用於傳送電子郵件訊息給您，以確認您在線上辦理的帳號註冊與各筆預訂。為了協助我們瞭解電子郵件訊息的有效性，我們會部署某些技術以在您開啟我們的電子郵件訊息時提供送達確認。作為會員，您有時還會收到我們提供的最新資訊，其中有特別優惠、新推出的ez訂網站 (ezding.com.tw) 服務以及其他值得關注的新聞。您可以選擇不接收此類電子郵件訊息。請參閱下述之「選擇/拒絕」一節。</li>
								<li>會員基本資料<br />除上述資訊外，您亦可選擇提供信用卡帳單資訊與其他個人識別資訊給我們。這些資訊主要用於協助您快速辦理預訂，無須重複鍵入相同資訊。</li>
								<li>客戶資料變更修改或刪除<br />如果您的個人資料有變更，除經發現有偽冒、詐欺等疑慮者外，可於「我的帳戶」中進行資料的修改。如欲刪除您的帳號者，請至客服中心留言告知。</li>
								<li>問卷活動與抽獎活動<br />我們有時會藉由問卷活動或抽獎活動來要求提供使用者的資訊。參與這些問卷活動或抽獎活動純屬自願性質，因此您可以選擇是否提供這些資訊。要求的資訊通常包括聯絡資訊 (例如姓名與郵寄地址) 以及統計資訊 (例如郵遞區號)。聯絡資訊將用於通知獲獎者及贈與獎項。問卷資訊則將用於監控或改善我們網站之使用情形與滿意度。雖然我們可能透過服務供應商來舉辦這些問卷活動或抽獎活動 (如「資訊分享」一節中所述)，因此服務供應商需知悉您在所提供之個人識別資訊，服務供應商不得將您的個人識別資訊移做任何其他用途。</li>
								<li>Cookie<br />Cookie 是儲存在您電腦上您的一小段相關資訊。我們使用兩種 Cookie，一種是工作階段 ID (或暫時性) Cookie，當您關閉瀏覽器時即會終止，另一種則是儲存在您硬碟上的永久性 Cookie。我們之所以使用 Cookie 有幾個原因。例如，Cookie 讓您不用在每次登入時都要鍵入登入名稱，只需提供密碼即可進入系統。Cookie 也讓我們能夠追蹤與鎖定使用者的興趣，以期改善我們網站的使用體驗。大多數的 Web 瀏覽器都會自動接受 Cookie，但您也可以依照個人意願編輯您的瀏覽器選項，從而在以後阻斷它們。如果您選擇拒絕 Cookie，您仍然可以造訪我們網站；然而在進入我們網站上某些區域時會受到限制。我們的第三方廣告公司也可能會將 Cookie 檔案置入您的硬碟中。這些公司可能要進行彙總的統計，計算您造訪本網站與其他網站的次數，以針對您可能感興趣的電影方面商品與服務提供廣告。ez訂網站 (ezding.com.tw) 無法使用或控制這些可能由第三方廣告商所置入的 Cookie。使用永久性 Cookie 的廣告網路可能會提供您停止成為廣告目標的方法。第三方廣告公司也可能運用技術來評估廣告的有效性。為此，它們會在我們網站上放置網站信標 (單點圖) 以收集匿名資訊。它們可能使用您造訪本網站與其他網站的匿名資訊，藉此針對您可能感興趣的商品與服務提供廣告。透過這種處理方式所收集的資訊是匿名的，不會在線上動作與可識別的個人間產生關聯。</li>
								<li>行動電話應用程式專屬條款<br />當您使用 iOS 或 Android 專用的行動版ez訂網站 (ezding.com.tw) (以下稱「應用程式」) 時，我們會像您使用ez訂網站 (ezding.com.tw) 網站時一樣，以相同目的與相同方式蒐集並使用您的資訊。</li>
							</ul>

							<div className="heading">
								<p>我們也會在您使用「應用程式」時自動蒐集和使用下列附加資訊：</p>
							</div>

							<ul>
								<li>「應用程式」使我們能夠追蹤您使用「應用程式」存取的地區，讓我們更新呈現的內容。<br />此項資訊是以匿名方式蒐集，我們無法以此得知您的身分。「應用程式」也會記錄行動電話的唯一裝置識別碼 (在 iPhone 中稱為「UUID (通用唯一識別碼)」，在 Android 系統行動電話中則稱為「裝置識別碼」)。我們只會在您首次開啟「應用程式」時使用 UUID 或裝置識別碼，向多個第三方確認應用程式已下載並開啟。</li>
								<li>如果「應用程式」發生問題且出現錯誤，「應用程式」會將此錯誤的相關訊息傳送給我們，以便查出錯誤並設法改善「應用程式」。此錯誤報告會告知我們手持裝置的類型與版本資訊、UUID/裝置識別碼、發生錯誤的時間、使用的功能，以及發生錯誤時應用程式的狀況。如果您不希望我們使用以上方式，透過「應用程式」蒐集和使用此資訊，請停用此功能 (即「應用程式」允許您如此做的選項)，或是從您的手持裝置中移除「應用程式」，並瀏覽我們的網站。我們希望讓 iPhone 和 Android 專用的「應用程式」更臻完美，以減少資料的使用。</li>
							</ul>

							<div className="heading">
								<p>標記：</p>
							</div>

							<ul>
								<li>為配合我們與關係企業的行銷活動，我們也可能運用技術，針對您透過我們網站所進行的預訂來擷取特定資訊。我們通常會在我們的預訂頁面放置網站信標 (單點圖)，藉以收集這些資訊。我們所收集的資訊是匿名的，其中包括交易的總金額與系統產生的預訂代號。我們將使用這些資訊來觀察我們行銷活動的有效性，並可能將這些資訊傳送給我們的關係企業，以用於類似的用途。我們可能藉由第三方服務供應商對收集到的資訊進行整理並做出報告。</li>
							</ul>

							<div className="heading">
								<p>記錄檔案：</p>
							</div>

							<ul>
								<li>如同大多數的標準網站伺服器，我們使用記錄檔案收集網際網路通訊協定 (IP) 位址、瀏覽器類型、網際網路服務供應商 (ISP)、參考的頁面/結束頁面、平台類型、日期/時間戳記、點選次數以及點選的頁面位置。我們使用這些資訊來分析趨勢、管理網站、全面追蹤使用者的活動情況、診斷伺服器問題，以及廣泛收集統計資訊來進行彙總。這些資訊不會與個人識別資訊產生關聯。</li>
							</ul>

							<div className="heading">
								<p>來自網站的訊息：</p>
							</div>

							<ul>
								<li>特別優惠與最新資訊<br />如上所述，已註冊的ez訂會員有時會收到感興趣的產品、服務與促銷活動的相關資訊。基於對使用者隱私權的尊重，我們提供會員不接收此類型訊息的選項。請參閱下述之「選擇/拒絕」一節。</li>
								<li>電影資訊與客戶回饋<br />如果您透過我們網站進行預訂，除通知您預訂狀態外 (請參閱上述「預約訂購」)，我們還會在您看電影前傳送電子郵件給您，內含電影取票提醒…等；我們有時會加入與您即將到來的電影有關、且您可能會感興趣的其他產品與服務資訊。您將可以選擇未來預訂時是否拒收這類的電子郵件。</li>
								<li>服務公告<br />在罕見的情況下，我們必須送出服務方面的公告。例如，如果我們的服務因為維護而暫時中止，我們可能會傳送電子郵件給您。您不能拒絕這種非促銷類的訊息，儘管您可以撤銷會員資格。</li>
								<li>客戶服務<br />我們會定期與您通訊，以提供要求的服務。這可能包括透過電子郵件或電話回覆，按您的希望而定。</li>
								<li>選擇/拒絕<br />您可以選擇不讓 ez訂網站 (ezding.com.tw) 繼續使用您的資訊來傳送促銷訊息。如果您不希望再收到我們的電子報和促銷訊息，只要回覆電子郵件標題行中的「取消訂閱」，即可拒絕接收此類訊息。</li>
							</ul>

							<div className="heading">
								<p>資訊分享：</p>
							</div>

							<ul>
								<li>免責聲明<br />雖然我們盡力保護使用者隱私權，我們仍有權依據我方營運流程、交易安全、商業政策、網站維護更新等需求，或依據相關法令負有法定義務或考量公共利益之情形，而利用或公開您所提供的資訊，包括但不限於針對威脅我們利益 (如客戶詐欺) 的人士，或其活動可能損害或傷害其他人的人士，此外我們可能必須向第三方提供客戶資訊，例如信用卡公司，以解決一般業務中所發生的糾紛。</li>
								<li>彙總資訊(非個人識別性)<br />我們會與商業合作夥伴和廣告商分享彙總的統計資訊。這些資訊不會與任何個人識別資訊產生關聯。</li>
								<li>獲得授權的服務供應商<br />我們會與獲得授權代表我方執行特定功能或服務的服務供應商分享您的個人識別資訊。例如，我們會透過外部的信用卡處理公司與銀行金流處理公司，向使用者收取商品與服務的費用。我們也依靠服務供應商來完成訂購、遞送包裹、執行業務與銷售分析以及提供行銷協助。這些公司無權分享、儲存或使用我們提供的個人識別資訊，以用於任何其他用途。我們也可能與聲譽良好的第三方締約，協助公佈調查、促銷活動或抽獎活動資訊。當這些專案結束時，所有資訊都會返回給我們。最後，我們有時會與服務供應商分享彙總的資訊。這些資訊不含任何個人識別資訊，而是用來開發我們的會員與網站訪問者會感興趣的特色活動與內容。</li>
								<li>供應商<br />我我們會向供應商提供在我們網站上電影預訂相關資訊，由他們來完成您的電影預訂。</li>
								<li>關係企業/參考的網站<br />如果您是從其他網站透過友情連結連線至我們網站，我們可能會與此友情連結網站分享您的個人識別資訊，以更好地瞭解我們網站的使用狀況。雖然我們相信讓您透過友情連結連線至我們網站的那些網站公司聲譽良好，但我們並未限制這些友情連結網站公司在未經您同意的情況下使用或公開您的資訊。因此，如果您是從任何網站參考到我們網站，請務必檢閱其資訊隱私權規則。</li>
								<li>關係企業<br />我們可能會與我們全球各地的關係企業分享您的某些個人識別資訊，這些公司致力於為您提供全面的服務，以滿足您的娛樂需求。分享這些資訊讓我們可以更加瞭解我們的各種產品與服務方案能在哪些方面協助您。就我們的關係企業獲取您這些資訊而言，其保護資訊的程度一定不會低於這些公司保護公司本身其他使用者之資訊的程度。</li>
								<li>業務轉讓<br />雖然我們不斷努力改善為客戶提供的服務，但我們也可能會賣出子公司或營業單位。我們也可能會被其他公司收購或與之合併。在此類情況下，客戶資訊可能成為轉讓的商業資產之一。</li>
								<li>國際轉讓<br />我們會處理中華民國境內的會員與使用者的個人識別資訊。 此外，我們可能與之分享您的資訊的第三方 (如上所述) 也可能屬於歐盟之外的國家/地區 (如美國)。使用我們網站即表示您瞭解並同意您的資訊將保存及使用於中華民國境內與 (我們的合作夥伴、服務供應商、關係企業可能所在的) 其他國家。</li>
								<li>連結<br />請注意，我們網站中包含通往其他網站的連結。這些網站可能會收集您的個人識別資訊。本「隱私權聲明」不涵蓋這些網站的資訊收集規則或規定。</li>
								<li>資訊安全<br />我們採取某些步驟以協助保護您提供給我們的個人識別資訊。例如，我們使用領先的加密技術來加密信用卡號碼。我們也規定個人識別資訊的使用只限於需要這些資訊來執行特定工作的員工 (例如我們的帳務員或客戶服務代表)。存放儲存個人識別資訊之伺服器的設施都會上鎖。如果您對資訊安全有任何疑問，請至客服中心留言。</li>
								<li>隱私權聲明變更<br />我們有權隨時變更隱私權規則，如有變更者，我們將一併修改本「隱私權聲明」及其生效日期，以確保您知道我們收集哪些資訊、我們可能使用資訊的方式，以及我們可能向誰公開資訊。我們也會在本「隱私權聲明」有任何重大變更時，在我們網站上放置醒目的公告來通知您。請務必定期查看本聲明以瞭解我們如何保護您的資訊。如您不同意變更者，請立即停止使用本網站之服務，已申請會員帳號者並請立即刪除帳號，感謝您的配合。</li>
							</ul>
						</div>
					</div>
				</div>
			);
		}else if(this.state.item === "terms"){
			return(
				<div className="footerPopUpWrapper">
					<div id="idNameFooterPopUp" className="terms">
						<div className="title">
							<h1>使用者條款</h1>
						</div>
						<div className="content">
							<div className="heading">
								<p>ezding.com.tw 聲明：</p>
							</div>

							<ul>
								<li>使用本網站即表示完全同意無條件接受，使用並遵守本網站所有條款。您與富爾特科技股份有限公司之網站ez訂網站 （以下皆稱ezding.com.tw）訂此合約(下稱本條款)，這些條款將規範詳列於下。如未閱讀或不接受此規範請勿使用本網站，一旦使用本網站的全部或任何一部份，表示同ezding.com.tw意接受本網站所有規範的約束。</li>
							</ul>

							<div className="heading">
								<p>本條款主要在於說明：</p>
							</div>

							<ul>
								<li>本網站僅負責協助確認預先電影訂位事宜，包含電影訂位項目，本身並未經營擁有電影發行或播放影院。</li>
								<li>若您使用電影訂位，如不能於各影城限制之取票期限內完成取票或辦理取消、退票，將不退還該筆金額，影城將全額扣款，恕不得要求退款或更改其他場次時間。</li>
								<li>其他與上述說明有關之本條款內容</li>
							</ul>

							<div className="heading">
								<p>網站使用條款：</p>
							</div>

							<ul>
								<li>您在此向ezding.com.tw保證，本網站不會被用於任何非法經營活動或本條款禁止的活動。</li>
							</ul>

							<div className="heading">
								<p>免責規範：</p>
							</div>

							<ul>
								<li>您要注意，ezding.com.tw 不保證本網站上所發佈的資訊均無誤，在使用本網站時，您要意識到本網站上所發佈的有關電影的詳細資訊，以及與電影預訂服務相關資訊在內的其他各種資訊，均可能不準確或是存在拼寫錯誤。您在本網站上所進行的所有電影預訂均是與相關的影城之間交易，而非 ezding.com.tw。</li>
								<li>ezding.com.tw僅是便於您能夠通過我們，從影城處預訂相對應的電影觀賞服務。在您與影城之間的買賣行為中， ezding.com.tw 不屬於買賣行為的任何相關方，不會承擔任何直接或間接責任或義務。</li>
								<li>在預訂影城所提供之電影觀賞或相關服務前，請確認您已經了解影城的條款及條件，並確證這些條款或條件您可以接受。</li>
								<li>對於因為使用本網站上所提供的任何資訊、產品、服務及（或）材料，而產生或導致的任何損失或損害，ezding.com.tw 及其管理人員、員工或代表人均對此不承擔任何責任。</li>
								<li>儘管ezding.com.tw 已經盡了適當努力確保本網站上所列的服務符合合理的標準，仍不得將本網站內所列出的任何服務視為 ezding.com.tw 推薦的服務，或是認為其代表該服務將會適用於該用戶。如果該服務不適用於您，ezding.com.tw 將對此不承擔任何責任。</li>
							</ul>

							<div className="heading">
								<p>網站使用者的守法義務及承諾：</p>
							</div>

							<ul>
								<li>你向 ezding.com.tw 承諾並保證，您絕不為任何非法目的或以任何非法方式使用本網站，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。您若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。您同意並保證不得利用本網站從事侵害他人權益或違法之行為。</li>
							</ul>

							<div className="heading">
								<p>年齡和責任：</p>
							</div>

							<ul>
								<li>你向 ezding.com.tw您確認您已經達到使用本網站的合法年齡。可以針對您在使用本網站時產生的任何責任，形成有約束力的法律責任。您理解使用本網站時及他人使用您的登錄資訊使用本網站時所產生的交易責任。</li>
							</ul>

							<div className="heading">
								<p>網站連結：</p>
							</div>

							<ul>
								<li>本網站可能包含有通往ezding.com.tw以外的其他方所運營網站的超連結。此類超連結僅提供用於參考。此類網站不是由 ezding.com.tw 控制，我們對其內容不承擔任何責任。在本網站上加入通往此類網站的超連結，並非暗示我們贊同此類網站上的材料或是與其經營人之間存在任何聯繫。</li>
							</ul>

							<div className="heading">
								<p>預訂條件：</p>
							</div>

							<ul>
								<li>線上預訂 (信用卡支付)<br />預訂電影時，請於各影城規定時限內完成取票，若辦理取消訂票，將線上退還票款、紅利點數，但訂票手續費，依影城規定恕不退還 (20元/張)。未辦理取消、退票或逾時未取票，將不退還該筆金額，影城將全額扣款，恕不得要求退款或更改其他場次時間。若您有完成取票，即依相關票價及所需之紅利點數做請款扣抵。</li>
								<li>刷卡手續費用<br />當您在本站刷卡付費時，ezding.com.tw每張票均收取20元之訂票手續費，但部分信用卡發卡銀行會針對於國外以新台幣交易時收取國外交易授權結匯手續費，有任何疑問可與您的信用卡發卡銀行聯繫。</li>
								<li>收據發票<br />ezding.com.tw與影城…等相關者，皆為代收代付關係，ezding.com.tw僅提供電子形式之購票憑證。</li>
								<li>取消退款政策<br />依照影城所規定之退款政策辦理。你提出預訂請求時，即代表你同意本網站及影城的退款政策。</li>
							</ul>

							<div className="heading">
								<p>信用卡或Visa金融卡交易免責規定：</p>
							</div>

							<ul>
								<li>ezding.com.tw 會合理地盡自己的能力確保所有信用卡及Visa金融卡交易的安全性。但是，如果您在本網站上預訂、交易有顯露信用卡詳細資訊的過程，您曾經在本網站上所使用過的任何信用卡或Visa金融卡出現未經授權扣費情況，那麼，因所述使用、交易或顯露而導致或與其相關聯而導致您遭受的任何損害或損失，ezding.com.tw 不承擔任何責任或義務。</li>
							</ul>

							<div className="heading">
								<p>智慧財產權說明：</p>
							</div>

							<ul>
								<li>本網站上的所有資訊、內容、圖片、文字、聲音、圖像22、按鈕、商標、服務標章及商品名稱均受中華民國國家法律及國際條約中所包含的著作權法、商標法及其他智慧財產權法的保護。 ezding.com.tw或其許可人（視情況而定）保留有這些素材中所包含的所有權利，所有權、權益及智慧財產權。對於從本網站上所獲取的任何資訊、素材、軟體、產品或服務，您不得對其更改、拷貝、傳播、發送、顯示、執行、複製、發佈、模仿、轉發或出售。除非本協議中明確指出，這些條款和條件中的任何內容不應被解釋為任何暗示或其他任何許可，或任何著作權法、商標法或其他智慧財產權或 ezding.com.tw、其許可人或任何協力廠商的業主權益中規定的任何權利的推斷結果。 如有任何人違反此規定，我們將追究其法律責任。</li>
							</ul>

							<div className="heading">
								<p>賠償：</p>
							</div>

							<ul>
								<li>您同意因您使用本網站，而導致 ezding.com.tw、其分公司、所屬機構、管理人員、代理人及其他合作夥伴和員工遭受的任何損失、責任及協力廠商的任何索賠或要求（包括律師費），將由您承擔賠償並保證 ezding.com.tw、其分公司、所屬機構、管理人員、代理人及其他合作夥伴和員工不受損失。</li>
							</ul>

							<div className="heading">
								<p>免責聲明：</p>
							</div>

							<ul>
								<li>您對本網站的所有使用均由您自擔風險。 因下載使用、參考或依賴本網站上所提供的資訊、產品、服務或素材或通過使用本網站而獲取到的資訊，而導致您遭受的任何風險或損失，將由您自己承擔全部責任。您同意 ezding.com.tw 及向ezding.com.tw提供電信及網路服務的提供商不會因您使用或不能使用本網站而造成的任何損失負責，同時，您會在此放棄有關此損失的所有及全部的索賠權利，無論是基於合約、侵權行為或其他依據。</li>
								<li>ezding.com.tw 不聲明、保證或承諾本網站或支持該網站的伺服器不會發生缺陷，其中包括但不僅限於病毒或其他有害元素。對於那些可損害或影響本網站管理、安全性、公正性和完整性，或是損害或影響本網站任何部分正常運行，且超出ezding.com.tw 控制範圍的任何病毒感染、BUG、篡改、技術故障、錯誤、遺漏、中斷、刪除、缺陷、延遲或任何事件或事故，ezding.com.tw 不承擔任何責任。 在適用法律許可的最大範圍內，所有明示、暗示或法定及其他聲明、保證和條款均予以最大限度的排除，其中包括但不僅限於有關本網站上服務、資訊及（或）聲明的保證或承諾，其中包括但不僅限於其精確性、完整性或適銷性、品質或適用於特定目的等。</li>
								<li>ezding.com.tw 不能持續或在某階段時間內對任一條款或多條條款的強制實施，不得將此視為放棄這些條款或是這些條款相關的權利。這些條款中使用的標題僅為了方便目的，其不應影響這些條款的範圍或意義，或是產生其他的法律效應。</li>
								<li>ezding.com.tw有權隨時變更本使用條款之內容及本網站上內容而不另行通知，同時，不對您、其他任何用戶或任何協力廠商承擔任何責任。 在每次訪問網站時，您應檢查一下這些條款是否發生了變更。</li>
							</ul>

							<div className="heading">
								<p>一般條款：</p>
							</div>

							<ul>
								<li>如因本條款發生爭議或涉訟及您對本網站的使用，均受中華民國法律所管轄。在此您同意，如因您每次登入本網站或使用本網站而導致或與之相關的訴訟，中華民國的法院將擁有絕對的訴訟管轄權。</li>
								<li>您同意這些條款或是您對本網站的使用，不會造成您與 ezding.com.tw 達成合資、合作、雇傭或代理關係。 ezding.com.tw 對這些條款的履行受現行法規和法律程式的管制，本條款中所包含的任何內容均不會損害 ezding.com.tw針對您對本網站的使用或ezding.com.tw 針對此類使用提供或收集的資訊，遵守法律強制執行請求或要求的權利。</li>
								<li>如果本條款中有任何部分被判定為無效或不可強制執行，其中包含但不僅限於上面所述的負責及責任限制部分，該無效或不可強制的規定將被與原規定的意圖最相近的有效、可執行的規定所替代，而條款中的其他部分仍保持有效。 這些條款構成您與 ezding.com.tw之間就本網站的完整協議，並將替代先前及當前您與 ezding.com.tw 之間達成的其他所有溝通及提議，無論其為電子、口頭或是書面格式。</li>
								<li>這些條款及以電子格式提供的所有說明的列印版本可在與本條款相關的仲裁或訴訟中使用，且其與原始生成的以列印格式保存的其他所有商業文檔及記錄具有等同的應用範圍及受相同條件的管理，且與原始紀錄具有相同的效力。</li>
								<li>儘管 ezding.com.tw 不能監視其使用者在網站以外的行為，但是，如果未經明確許可，使用從本網站上獲取的資訊騷擾、侮辱或對其他人造成傷害，或是用於聯繫任何用戶或人員，或是向其做廣告或發送求助資訊均屬於違反這些條款的行為，本網站有權不經通知即終止您帳戶的使用權，而無須承擔任何責任。</li>
								<li>隱私保護政策<br />有關ezding.com.tw隱私保護政策的詳細資訊，按如下原則運作：在您通過 ezding.com.tw網站預訂或購買服務時，我們會將您的資訊提供給所需的協力業者。同時，我們在運作過程中，也會偶爾使用您的資訊，以向您發送有關 ezding.com.tw 新功能、服務及產品的資訊。有時候，我們可能會將我們客戶的統計資料提供給協力業者。這些統計資訊中絕不會包含可以辨別身份的個人資訊。相關細節請續參閱隱私權聲明，並該聲明內容亦構成本條款之一部。<br />如果您認為ezding.com.tw 未能遵守這些規定，請聯繫我們，我們將盡合理的努力儘快地確定並糾正出現的問題。<br />如有任何問題，請發信至 ezding.com.tw 客服信箱：service@fullerton.com.tw</li>
							</ul>
						</div>
					</div>
				</div>
			);
		}else{
			return(
				<div className="footerPopUpWrapper">
					<div id="idNameFooterPopUp" className="antiFraud">
						<div className="title">
							<h1>網路安全通報</h1>
						</div>
						<div className="content">
							<div className="subContent">
								<div className="gray">目前網路詐騙的案件，層出不窮。</div>

								<div className="pink">提醒會員：</div>

								<div className="gray">ez訂的任何人員或合作銀行，不會經由電話或其他任何方式，指示會員操作ATM提款機、臨櫃提款，或有任何匯款行為；</div>
								<div className="gray">ez訂的任何人員或合作銀行，不會套問會員的個人資訊（例如：金融卡帳號密碼或信用卡卡號等資訊）。</div>

								<div className="pink">請會員放心：</div>

								<div className="gray">ez訂保障每一位會員的個人資訊安全。如果您接到任何疑似詐騙的電話或訊息，請立即掛斷電話或中止互動，並請與ez訂客服人員反應。</div>
								<div className="gray">ez訂將蒐集資料並與相關單位合作，共同打擊網路詐騙犯罪。</div>

								<div className="pink">ez訂客服信箱：service@fullerton.com.tw</div>
								<div className="pink">ez訂客服專線：(02)8912-6600</div>
								<div className="pink">（週一～週六 09:00～21:00，週日及國定假日 09:00～18:00）</div>
							</div>

							<div className="heading">
								<p>詐騙集團的手法日益翻新，建議您：</p>
							</div>

							<ul>
								<li>定期更新電腦及帳戶密碼、安裝防毒軟體與防火牆</li>
								<li>不要下載不認識的程式，避免被植入木馬程式，讓詐騙集團竊取您的資料</li>
								<li>小心開啟E-mail，防止駭客透過社交行為，攻擊取得帳密或植入木馬</li>
							</ul>

							<div className="heading">
								<p>蒐集詐騙集團近期的詐騙話術，請您注意：</p>
							</div>

							<ul>
								<li>誤刷分期，將重複扣款</li>
								<li>出現重複訂單，將連續扣款</li>
								<li>刷卡失敗，需改成轉帳</li>
								<li>自稱為帳務人員、會計人員…等，要求轉帳匯款</li>
								<li className="pink">最後都會引導您，按指示操作ATM提款機或是臨櫃匯款，以上都是詐騙話術，請會員無須回應，立即掛上電話，並與ez訂客服反應。</li>
							</ul>

							<div className="heading">
								<p>近期網路詐騙案例，請您注意：</p>
							</div>

							<ul>
								<li>歹徒偽裝網路平台業者的客服人員，打電話給您（電話號碼，故意竄改成平台業者的電話號碼），並以各種方式套問：會員銀行帳戶金額，信用卡或提款卡後面的客服電話，歹徒之後再「偽裝成該銀行客服來電」，誤導會員至ATM提款機操作各種功能（例如解除分期，解除重複訂單，解除重複扣款…等）。<div className="pink inner">但事實上ATM提款機，只能領錢或將錢轉出，沒有其他的功能（例如解除設定），這些都是詐騙手法！請會員無須回應，立即掛上電話，並與ez訂客服反應。</div></li>
							</ul>
						</div>
					</div>
				</div>
			);
		}
	}

	componentDidMount(){
		let urlParams = window.location.search;
		if (urlParams.indexOf('privacy=true') >= 0) {
			this.popUpOpen('privacy');
		}else if (urlParams.indexOf('member=true')>= 0) {
			this.popUpOpen('terms');
		}else{

		}
	}


  render () {
    return (
	    <FooterWrapper>
	    	<div className="wrapper">
				{	//show 隱私權條款，會員條款，反詐騙宣導
					this.state.visiblePopUp ? <PopUpContent visiblePopUp={this.state.visiblePopUp} showUi={this.showUi} popUpOpen={this.popUpOpen}/>
					:
					null
				}
	    		<div className="box">

					<div className="link-box">
						<div className="logo">
							<img src={'/static/common/ezDinglogo.png'}/>
						</div>
						<a href="https://www.facebook.com/sofunezding">
							<div className="link">
								<MdArrowForward className="icon"/>
								<div className="text">官方粉絲團</div>
							</div>
						</a>
						<div className="link">
							<MdArrowForward className="icon"/>
							<div className="text" onClick={()=>this.popUpOpen('privacy')}>隱私權條款</div>
						</div>
						<div className="link">
							<MdArrowForward className="icon"/>
							<div className="text" onClick={()=>this.popUpOpen('terms')}>會員條款</div>
						</div>
						<div className="link">
							<MdArrowForward className="icon"/>
							<div className="text" onClick={()=>this.popUpOpen('antiFraud')}>反詐騙宣導</div>
						</div>
					</div>

					<Clearfix />
					<div className="sloganBox">
						<div className="slogan">ez訂採用先進的TLS傳輸加密機制，資料傳輸皆經加密處理，以確保您於使用本服務資料傳輸之安全。</div>
						<div className="cardBox">
							<img className="card visa" src={'/static/common/common-visa.png'}/>
							<img className="card" src={'/static/common/common-master.png'}/>
							<img className="card" src={'/static/common/common-jcb.png'}/>
						</div>
					</div>
	    		</div>
	    		<div className="rwd768">
	    			<div className="logo">
						<img src={'/static/common/ezDinglogo.png'}/>
					</div>
					<a href="https://www.facebook.com/sofunezding/"><div className="text">官方粉絲團</div></a>
					<div className="text" onClick={()=>this.popUpOpen('privacy')}>隱私權條款</div>
					<div className="text" onClick={()=>this.popUpOpen('terms')}>會員條款</div>
					<div className="text last" onClick={()=>this.popUpOpen('antiFraud')}>反詐騙宣導</div>
	    		</div>
	    		<div className="right" style={{backgroundImage:`url('/static/common/cellphone.jpg')`}}>
	    			<img className="logo2" src={'/static/common/common-ezDing-app-logo.png'}/>
	    			<div className="word">全新上線，手機也能輕鬆訂票，更方便更安全</div>
	    			<img className="app" src={'/static/common/common-google-play.png'}/>
	    			<img className="app" src={'/static/common/common-app-store.png'}/>
	    		</div>
	    		<div className="bottom">
					<div className="testWrap">
						<div className="text">富爾特科技股份有限公司</div>
						<div className="text">台灣新北市新店區寶強路6-3號5樓</div>
						<div className="text">客服電話:(02)8912-6600</div>
					</div>
					<div>Copyright Since 2017 ez訂 版權所有。轉載必究</div>
	    		</div>
	    		<Clearfix />
	    	</div>
	    </FooterWrapper>
    )
  }
}



export default Footer;
