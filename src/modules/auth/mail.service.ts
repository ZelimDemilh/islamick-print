import { Inject, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async senActivateMail(to, link) {
    await this.mailerService.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: "",
      html: `
            <div>
              <h1>
                Для активации перейдите по ссылке
                <a href="${link}">${link}</a>
              </h1>
            </div>
          `,
    });
  }
}
